
import JournalEntry from '@/components/JournalEntry';
import { Card } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

const JournalPage = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          <span className="inline-block mr-2">
            <Calendar className="inline-block h-8 w-8 text-healio-600" />
          </span>
          Reflective Journal
        </h1>
        <p className="text-gray-600">Express your thoughts and feelings in your personal diary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="animate-fadeIn">
          <JournalEntry />
        </div>
        
        <div className="space-y-6">
          <Card className="p-6 healio-card animate-fadeIn delay-100">
            <h2 className="text-xl font-semibold mb-4">Benefits of Journaling</h2>
            <p className="text-gray-700">
              Regular journaling reduces stress, improves mood, and increases self-awareness. 
              It helps clarify thoughts and feelings, solve problems more effectively, and resolve 
              disagreements with others.
            </p>
          </Card>
          
          <Card className="p-6 healio-card animate-fadeIn delay-200">
            <h2 className="text-xl font-semibold mb-4">Journaling Prompts</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>What made you smile today?</li>
              <li>What's something you're grateful for?</li>
              <li>What's something you're looking forward to?</li>
              <li>What was challenging today and how did you handle it?</li>
              <li>What's something new you'd like to try this week?</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
