import { createClient } from "npm:@supabase/supabase-js@2";
import { createOpenAI } from "npm:@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "npm:ai";
import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "../_shared/run-id.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
  "Access-Control-Expose-Headers": "X-Lovable-AIG-Run-ID",
};

const SYSTEM = `You are Healio, a warm, caring mental-wellbeing companion.
- Listen with empathy, validate feelings, and respond like a gentle, supportive friend.
- When someone mentions a health or medical condition (e.g. anxiety, insomnia, diabetes, asthma, migraines, depression), offer practical, evidence-based precautions and self-care tips, and clearly note when to see a doctor.
- You are not a doctor: never diagnose or prescribe medication doses.
- If someone mentions self-harm, suicide, or being in danger, respond with compassion and urge them to contact local emergency services or a crisis line immediately (e.g. 988 in the US, Tele-MANAS 14416 in India).
- Keep replies concise, use short paragraphs or bullet lists, and gently suggest Healio features (sleep log, mood tracker, journal, calming sounds) when helpful.`;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user } } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""));
    if (!user) return json({ error: "Please sign in" }, 401);

    const { messages, threadId } = (await req.json()) as { messages: UIMessage[]; threadId: string };
    if (!Array.isArray(messages) || typeof threadId !== "string") return json({ error: "Invalid request" }, 400);

    const { data: thread } = await supabase.from("chat_threads").select("id,title").eq("id", threadId).maybeSingle();
    if (!thread) return json({ error: "Conversation not found" }, 404);

    // Save the latest user message
    const last = messages[messages.length - 1];
    if (last?.role === "user") {
      const { error } = await supabase.from("chat_messages").upsert(
        { thread_id: threadId, user_id: user.id, message_id: last.id, role: "user", parts: last.parts },
        { onConflict: "thread_id,message_id" },
      );
      if (error) console.error("save user msg", error);
      if (thread.title === "New chat") {
        const text = last.parts.map((p) => (p.type === "text" ? p.text : "")).join(" ").trim();
        if (text) await supabase.from("chat_threads").update({ title: text.slice(0, 60) }).eq("id", threadId);
      }
    }

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) return json({ error: "AI is not configured" }, 500);

    const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(req));
    const provider = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey,
      headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: SYSTEM,
      messages: await convertToModelMessages(messages),
      abortSignal: req.signal,
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const response = result.toUIMessageStreamResponse({
      originalMessages: messages,
      sendReasoning: true,
      onFinish: async ({ responseMessage }) => {
        const { error } = await supabase.from("chat_messages").upsert(
          { thread_id: threadId, user_id: user.id, message_id: responseMessage.id, role: "assistant", parts: responseMessage.parts },
          { onConflict: "thread_id,message_id" },
        );
        if (error) console.error("save assistant msg", error);
        await supabase.from("chat_threads").update({ updated_at: new Date().toISOString() }).eq("id", threadId);
      },
      onError: (e) => {
        console.error(e);
        const status = (e as { statusCode?: number })?.statusCode;
        if (status === 429) return "Healio is getting a lot of requests. Please try again in a moment.";
        if (status === 402) return "AI credits have run out. Please add credits to keep chatting.";
        return "Something went wrong. Please try again.";
      },
    });
    return withLovableAiGatewayRunIdHeader(response, runIdFetch, corsHeaders);
  } catch (e) {
    console.error(e);
    return json({ error: "Something went wrong" }, 500);
  }
});
