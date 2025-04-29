
import MoodTracker from '@/components/MoodTracker';
import { Card } from '@/components/ui/card';
import { Smile } from 'lucide-react';

const MoodPage = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          <span className="inline-block mr-2">
            <Smile className="inline-block h-8 w-8 text-healio-600" />
          </span>
          Mood Tracker
        </h1>
        <p className="text-gray-600">Track how you're feeling throughout your day</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="animate-fadeIn">
          <MoodTracker />
        </div>
        
        <div className="space-y-6">
          <Card className="p-6 healio-card animate-fadeIn delay-100">
            <h2 className="text-xl font-semibold mb-4">Why Track Your Mood?</h2>
            <p className="text-gray-700">
              Regular mood tracking helps you identify patterns, triggers, and factors that influence your emotional wellbeing. 
              This awareness is the first step toward managing your mental health effectively.
            </p>
          </Card>
          
          <Card className="p-6 healio-card animate-fadeIn delay-200">
            <h2 className="text-xl font-semibold mb-4">Mood Management Tips</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Practice mindfulness and stay in the present moment</li>
              <li>Engage in physical activity to boost endorphins</li>
              <li>Connect with supportive friends and family</li>
              <li>Use breathing exercises when feeling overwhelmed</li>
              <li>Remember that all emotions are valid and temporary</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MoodPage;
