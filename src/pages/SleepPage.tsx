
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import SleepTracker from '@/components/SleepTracker';
import { Bed } from 'lucide-react';

const SleepPage = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          <span className="inline-block mr-2">
            <Bed className="inline-block h-8 w-8 text-healio-600" />
          </span>
          Sleep Tracker
        </h1>
        <p className="text-gray-600">Track your sleep patterns for better mental health</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="animate-fadeIn">
          <SleepTracker />
        </div>
        
        <Card className="p-6 healio-card animate-fadeIn">
          <h2 className="text-xl font-semibold mb-4">Sleep Tips</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
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
