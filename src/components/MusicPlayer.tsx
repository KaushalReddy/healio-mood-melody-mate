
import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Headphones, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);

  const tracks = [
    { title: "Peaceful Morning", artist: "Nature Sounds", duration: "5:23" },
    { title: "Ocean Waves", artist: "Ambient Melodies", duration: "6:10" },
    { title: "Forest Rain", artist: "Earth Tones", duration: "4:45" },
    { title: "Meditation Flow", artist: "Mind Ease", duration: "7:30" },
    { title: "Gentle Piano", artist: "Calm Keys", duration: "3:55" },
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <Card className="w-full max-w-md mx-auto healio-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headphones className="h-6 w-6 text-healio-600" />
          Relaxing Music
        </CardTitle>
        <CardDescription>Soothing melodies to calm your mind</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-br from-mind-100 to-healio-100 p-6 rounded-xl flex flex-col items-center justify-center">
          <div className="w-20 h-20 healio-gradient rounded-full flex items-center justify-center mb-4">
            <Headphones className="w-10 h-10 text-white" />
          </div>
          <h3 className="font-semibold text-lg">{tracks[currentTrack].title}</h3>
          <p className="text-gray-600">{tracks[currentTrack].artist}</p>
          
          <div className="w-full mt-4 bg-gray-200 rounded-full h-1.5">
            <div className="healio-gradient h-1.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          
          <div className="flex justify-between w-full mt-1">
            <span className="text-xs text-gray-600">2:25</span>
            <span className="text-xs text-gray-600">{tracks[currentTrack].duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full h-10 w-10"
            onClick={prevTrack}
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button
            className="healio-gradient rounded-full h-12 w-12 flex items-center justify-center"
            size="icon"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className="rounded-full h-10 w-10"
            onClick={nextTrack}
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 className="h-4 w-4 text-gray-600" />
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setVolume(value[0])}
            className="flex-grow"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Up Next:</h3>
          <div className="space-y-1 max-h-32 overflow-y-auto pr-2">
            {tracks.map((track, index) => (
              <div 
                key={index}
                className={`p-2 rounded-lg cursor-pointer flex justify-between hover:bg-gray-50 ${
                  currentTrack === index ? 'bg-healio-50 border border-healio-200' : ''
                }`}
                onClick={() => setCurrentTrack(index)}
              >
                <div>
                  <p className="font-medium text-sm">{track.title}</p>
                  <p className="text-xs text-gray-600">{track.artist}</p>
                </div>
                <span className="text-xs text-gray-500 self-center">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
