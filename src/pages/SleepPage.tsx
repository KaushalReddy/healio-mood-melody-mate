import { Card } from '@/components/ui/card';
import SleepTracker from '@/components/SleepTracker';
import { History, formatDate } from '@/components/History';
import { useEntries } from '@/hooks/useEntries';
import { Bed } from 'lucide-react';

type Sleep = { id: string; hours: number; quality: number; notes: string | null; created_at: string };
const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

const SleepPage = () => {
  const { query, add, remove } = useEntries<Sleep>('sleep_logs');
  const recent = query.data?.slice(0, 7) ?? [];
  const avg = recent.length ? (recent.reduce((s, r) => s + Number(r.hours), 0) / recent.length).toFixed(1) : null;

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          <Bed className="inline-block h-8 w-8 mr-2 text-primary" />
          Sleep Tracker
        </h1>
        <p className="text-muted-foreground">Track your sleep patterns for better mental health</p>
        {avg && <p className="mt-2 text-sm text-primary font-medium">Average over your last {recent.length} nights: {avg} hours</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SleepTracker onSave={(row) => add.mutateAsync(row)} />
        <History
          title="Sleep history"
          items={query.data}
          empty="No nights logged yet."
          getId={(r) => r.id}
          onDelete={(r) => remove.mutate(r.id)}
          render={(r) => (
            <>
              <p className="font-medium text-sm">{Number(r.hours)} hours · {labels[r.quality]}</p>
              <p className="text-xs text-muted-foreground">{formatDate(r.created_at)}</p>
              {r.notes && <p className="text-sm mt-1">{r.notes}</p>}
            </>
          )}
        />
        <Card className="p-6 healio-card md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Sleep Tips</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Maintain a consistent sleep schedule, even on weekends</li>
            <li>Create a restful environment (cool, dark, and quiet)</li>
            <li>Avoid screens at least 30 minutes before bedtime</li>
            <li>Limit caffeine and alcohol, especially in the evening</li>
            <li>Try relaxation techniques like deep breathing or meditation</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default SleepPage;
