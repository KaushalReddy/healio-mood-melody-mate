
import MusicPlayer from '@/components/MusicPlayer';
import { Card } from '@/components/ui/card';
import { Headphones } from 'lucide-react';

const MusicPage = () => {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="text-center mb-8 animate-fadeIn">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          <span className="inline-block mr-2">
            <Headphones className="inline-block h-8 w-8 text-healio-600" />
          </span>
          Relaxing Music
        </h1>
        <p className="text-gray-600">Soothing sounds to calm your mind</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="animate-fadeIn">
          <MusicPlayer />
        </div>
        
        <div className="space-y-6">
          <Card className="p-6 healio-card animate-fadeIn delay-100">
            <h2 className="text-xl font-semibold mb-4">Music & Mental Health</h2>
            <p className="text-gray-700">
              Music therapy is a powerful tool for mental wellbeing. Calming music can reduce stress 
              hormone levels, lower blood pressure, slow your heart rate, and help you fall asleep. 
              Regular listening can improve mood and cognitive function.
            </p>
          </Card>
          
          <Card className="p-6 healio-card animate-fadeIn delay-200">
            <h2 className="text-xl font-semibold mb-4">Recommended Listening</h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Start your day with gentle instrumental music</li>
              <li>Use nature sounds during work for improved focus</li>
              <li>Try binaural beats for deep meditation</li>
              <li>Classical music can enhance cognitive performance</li>
              <li>Low-tempo music before bed helps with sleep quality</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
