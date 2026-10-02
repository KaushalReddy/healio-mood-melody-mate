import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { HeartHandshake, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputFooter, PromptInputSubmit, PromptInputTextarea } from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type Thread = { id: string; title: string; updated_at: string };

const useThreads = () =>
  useQuery({
    queryKey: ["chat_threads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("chat_threads").select("id,title,updated_at").order("updated_at", { ascending: false });
      if (error) throw error;
      return data as Thread[];
    },
  });

const createThread = async () => {
  const { data, error } = await supabase.from("chat_threads").insert({}).select("id").single();
  if (error) throw error;
  return data.id as string;
};

const ChatWindow = ({ threadId, initial }: { threadId: string; initial: UIMessage[] }) => {
  const qc = useQueryClient();
  const [input, setInput] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const { messages, sendMessage, status, stop } = useChat({
    id: threadId,
    messages: initial,
    transport: new DefaultChatTransport({
      api: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
      headers: async () => {
        const { data } = await supabase.auth.getSession();
        return { Authorization: `Bearer ${data.session?.access_token ?? ""}`, apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY };
      },
      body: { threadId },
    }),
    onFinish: () => qc.invalidateQueries({ queryKey: ["chat_threads"] }),
    onError: (e) => toast.error(e.message || "Something went wrong"),
  });
  useEffect(() => { if (status === "ready") ref.current?.focus(); }, [status]);

  return (
    <div className="flex h-full flex-col">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 && (
            <ConversationEmptyState
              icon={<HeartHandshake className="h-10 w-10 text-primary" />}
              title="Hi, I'm Healio"
              description="Tell me how you're feeling, or ask about a health condition for gentle precautions."
            />
          )}
          {messages.map((m) => (
            <Message from={m.role} key={m.id}>
              <MessageContent className={m.role === "user" ? "bg-primary text-primary-foreground" : ""}>
                {m.parts.map((p, i) =>
                  p.type === "text" ? (m.role === "assistant" ? <MessageResponse key={i}>{p.text}</MessageResponse> : <p key={i} className="whitespace-pre-wrap">{p.text}</p>) : null,
                )}
              </MessageContent>
            </Message>
          ))}
          {status === "submitted" && <p className="text-sm text-muted-foreground animate-pulse">Healio is thinking…</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      <PromptInput
        className="mt-3"
        onSubmit={(msg) => {
          const text = msg.text?.trim();
          if (!text) return;
          sendMessage({ text });
          setInput("");
        }}
      >
        <PromptInputTextarea ref={ref} autoFocus value={input} onChange={(e) => setInput(e.target.value)} placeholder="How are you feeling today?" />
        <PromptInputFooter className="justify-end">
          <PromptInputSubmit status={status} onStop={stop} disabled={!input.trim() && status === "ready"} />
        </PromptInputFooter>
      </PromptInput>
    </div>
  );
};

const AiAssistantPage = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const threads = useThreads();

  useEffect(() => {
    if (threadId || !threads.data) return;
    if (threads.data.length) navigate(`/ai-assistant/${threads.data[0].id}`, { replace: true });
    else createThread().then((id) => { qc.invalidateQueries({ queryKey: ["chat_threads"] }); navigate(`/ai-assistant/${id}`, { replace: true }); });
  }, [threadId, threads.data, navigate, qc]);

  const msgs = useQuery({
    queryKey: ["chat_messages", threadId],
    enabled: !!threadId,
    queryFn: async () => {
      const { data, error } = await supabase.from("chat_messages").select("message_id,role,parts").eq("thread_id", threadId!).order("created_at");
      if (error) throw error;
      return data.map((r) => ({ id: r.message_id, role: r.role, parts: r.parts })) as UIMessage[];
    },
    staleTime: Infinity,
  });

  const newChat = async () => {
    try {
      const id = await createThread();
      qc.invalidateQueries({ queryKey: ["chat_threads"] });
      navigate(`/ai-assistant/${id}`);
    } catch (e) { toast.error((e as Error).message); }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("chat_threads").delete().eq("id", id);
    if (error) return toast.error(error.message);
    await qc.invalidateQueries({ queryKey: ["chat_threads"] });
    if (id === threadId) navigate("/ai-assistant");
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <div className="grid gap-4 md:grid-cols-[240px_1fr]">
        <aside className="healio-card rounded-xl border p-3 space-y-2 md:h-[calc(100vh-8rem)] overflow-y-auto">
          <Button onClick={newChat} className="w-full"><Plus className="mr-2 h-4 w-4" />New chat</Button>
          {threads.data?.map((t) => (
            <div key={t.id} className={cn("flex items-center gap-1 rounded-md", t.id === threadId && "bg-accent")}>
              <button className="flex-1 truncate px-2 py-2 text-left text-sm" onClick={() => navigate(`/ai-assistant/${t.id}`)}>{t.title}</button>
              <Button variant="ghost" size="icon" aria-label="Delete chat" onClick={() => remove(t.id)}><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
        </aside>
        <section className="healio-card rounded-xl border p-4 h-[calc(100vh-8rem)] flex flex-col">
          <p className="mb-2 text-xs text-muted-foreground">Healio offers general support, not medical advice. In a crisis, call your local emergency number.</p>
          {threadId && msgs.data ? <ChatWindow key={threadId} threadId={threadId} initial={msgs.data} /> : <p className="text-muted-foreground">Loading…</p>}
        </section>
      </div>
    </div>
  );
};

export default AiAssistantPage;
