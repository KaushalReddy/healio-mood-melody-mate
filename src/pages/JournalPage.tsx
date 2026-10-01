import JournalEntry from '@/components/JournalEntry';
import { History, formatDate } from '@/components/History';
import { useEntries } from '@/hooks/useEntries';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

type Entry = { id: string; title: string; content: string; created_at: string };

const JournalPage = () => {
  const { query, add, remove } = useEntries<Entry>('journal_entries');
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          <Calendar className="inline-block h-8 w-8 mr-2 text-primary" />
          Reflective Journal
        </h1>
        <p className="text-muted-foreground">Express your thoughts and feelings in your personal diary</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <JournalEntry onSave={(row) => add.mutateAsync(row)} />
          <Card className="p-6 healio-card">
            <h2 className="text-xl font-semibold mb-4">Journaling Prompts</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li>What made you smile today?</li>
              <li>What's something you're grateful for?</li>
              <li>What was challenging today and how did you handle it?</li>
              <li>What's something you're looking forward to?</li>
            </ul>
          </Card>
        </div>
        <History
          title="Past entries"
          items={query.data}
          empty="Your diary is empty. Write your first entry!"
          getId={(r) => r.id}
          onDelete={(r) => remove.mutate(r.id)}
          render={(r) => (
            <details>
              <summary className="cursor-pointer font-medium text-sm">{r.title}</summary>
              <p className="text-xs text-muted-foreground">{formatDate(r.created_at)}</p>
              <p className="text-sm mt-2 whitespace-pre-wrap">{r.content}</p>
            </details>
          )}
        />
      </div>
    </div>
  );
};

export default JournalPage;
