
import { useState } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { useToast } from '@/hooks/use-toast';
import { Bed } from 'lucide-react';

const SleepTracker = () => {
  const [hours, setHours] = useState(7);
  const [quality, setQuality] = useState(3);
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save to a database
    toast({
      title: "Sleep data logged",
      description: `You slept for ${hours} hours with ${qualityLabel} quality.`,
    });
  };

  const qualityOptions = [
    { value: 1, label: 'Poor' },
    { value: 2, label: 'Fair' },
    { value: 3, label: 'Good' },
    { value: 4, label: 'Very Good' },
    { value: 5, label: 'Excellent' }
  ];

  const qualityLabel = qualityOptions.find(option => option.value === quality)?.label;

  return (
    <Card className="w-full max-w-md mx-auto healio-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bed className="h-6 w-6 text-healio-600" />
          Sleep Tracker
        </CardTitle>
        <CardDescription>Record your sleep duration and quality</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Hours Slept: <span className="font-semibold text-healio-600">{hours}</span>
            </label>
            <Slider 
              value={[hours]} 
              min={0} 
              max={12} 
              step={0.5} 
              onValueChange={(value) => setHours(value[0])}
              className="py-4" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Sleep Quality: <span className="font-semibold text-healio-600">{qualityLabel}</span>
            </label>
            <div className="flex justify-between">
              {qualityOptions.map((option) => (
                <Button
                  key={option.value}
                  type="button"
                  variant={quality === option.value ? "default" : "outline"}
                  className={`w-12 h-12 p-0 ${quality === option.value ? 'healio-gradient' : ''}`}
                  onClick={() => setQuality(option.value)}
                >
                  {option.value}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium">Notes (Optional)</label>
            <textarea
              className="w-full healio-input"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any comments about your sleep..."
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full healio-gradient" onClick={handleSubmit}>
          Log Sleep
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SleepTracker;
