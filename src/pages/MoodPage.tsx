import MoodTracker, { moods } from '@/components/MoodTracker';
import { History, formatDate } from '@/components/History';
import { useEntries } from '@/hooks/useEntries';
import { Smile } from 'lucide-react';

type Mood = { id: string; mood: string; notes: string | null; created_at: string };

const MoodPage = () => {
  const { query, add, remove } = useEntries<Mood>('mood_logs');
  const counts = moods
    .map((m) => ({ ...m, n: query.data?.filter((r) => r.mood === m.label).length ?? 0 }))
    .filter((m) => m.n > 0);

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          <Smile className="inline-block h-8 w-8 mr-2 text-primary" />
          Mood Tracker
        </h1>
        <p className="text-muted-foreground">Notice how you feel, and spot patterns over time</p>
        {counts.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {counts.map((c) => (
              <span key={c.label} className="rounded-full border px-3 py-1 text-sm">{c.emoji} {c.label} × {c.n}</span>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MoodTracker onSave={(row) => add.mutateAsync(row)} />
        <History
          title="Mood history"
          items={query.data}
          empty="No moods logged yet."
          getId={(r) => r.id}
          onDelete={(r) => remove.mutate(r.id)}
          render={(r) => (
            <>
              <p className="font-medium text-sm">{moods.find((m) => m.label === r.mood)?.emoji} {r.mood}</p>
              <p className="text-xs text-muted-foreground">{formatDate(r.created_at)}</p>
              {r.notes && <p className="text-sm mt-1">{r.notes}</p>}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default MoodPage;
