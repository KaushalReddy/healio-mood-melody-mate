
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { Smile } from 'lucide-react';

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const moods = [
    { emoji: '😊', label: 'Happy', color: 'bg-green-100 border-green-200' },
    { emoji: '😌', label: 'Calm', color: 'bg-blue-100 border-blue-200' },
    { emoji: '😐', label: 'Neutral', color: 'bg-gray-100 border-gray-200' },
    { emoji: '😔', label: 'Sad', color: 'bg-indigo-100 border-indigo-200' },
    { emoji: '😠', label: 'Angry', color: 'bg-red-100 border-red-200' },
    { emoji: '😰', label: 'Anxious', color: 'bg-yellow-100 border-yellow-200' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      toast({
        title: "Please select a mood",
        description: "Select how you're feeling right now",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would save to a database
    toast({
      title: "Mood logged",
      description: `You're feeling ${selectedMood}`,
    });
  };

  return (
    <Card className="w-full max-w-md mx-auto healio-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smile className="h-6 w-6 text-healio-600" />
          Mood Tracker
        </CardTitle>
        <CardDescription>How are you feeling today?</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-3 gap-3">
            {moods.map((mood) => (
              <Button
                key={mood.label}
                type="button"
                variant="outline"
                className={`h-auto py-3 px-2 flex flex-col items-center ${mood.color} ${
                  selectedMood === mood.label 
                    ? 'ring-2 ring-healio-500' 
                    : ''
                }`}
                onClick={() => setSelectedMood(mood.label)}
              >
                <span className="text-2xl mb-1">{mood.emoji}</span>
                <span className="text-sm">{mood.label}</span>
              </Button>
            ))}
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">What's on your mind? (Optional)</label>
            <textarea
              className="w-full healio-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Share your thoughts..."
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full healio-gradient" 
          onClick={handleSubmit}
          disabled={!selectedMood}
        >
          Log Mood
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MoodTracker;
