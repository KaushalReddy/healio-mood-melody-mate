
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calendar } from 'lucide-react';

const JournalEntry = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast({
        title: "Please add a title",
        description: "Your journal entry needs a title",
        variant: "destructive",
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Please add content",
        description: "Write something in your journal",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would save to a database
    toast({
      title: "Journal entry saved",
      description: "Your thoughts have been recorded",
    });
  };

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="w-full max-w-md mx-auto healio-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-healio-600" />
          Daily Journal
        </CardTitle>
        <CardDescription>{today}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              className="w-full healio-input px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Today's Thoughts</label>
            <textarea
              className="w-full healio-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              placeholder="Write about your day, feelings, thoughts, or anything that's on your mind..."
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full healio-gradient" 
          onClick={handleSubmit}
          disabled={!title.trim() || !content.trim()}
        >
          Save Entry
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JournalEntry;
