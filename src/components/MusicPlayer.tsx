import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Headphones, Play, Pause, SkipBack, SkipForward, Volume2, Timer } from 'lucide-react';
import { AmbientEngine, type SoundKind } from '@/lib/ambient';

const tracks: { title: string; artist: string; kind: SoundKind }[] = [
  { title: "Gentle Rain", artist: "Soft rainfall", kind: "rain" },
  { title: "Ocean Waves", artist: "Slow tides", kind: "ocean" },
  { title: "Morning Forest", artist: "Breeze & birdsong", kind: "forest" },
  { title: "Deep Calm", artist: "Meditation drone", kind: "drone" },
  { title: "Gentle Piano", artist: "Soft wandering notes", kind: "piano" },
];

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const MusicPlayer = () => {
  const engine = useRef<AmbientEngine | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [elapsed, setElapsed] = useState(0);
  const [timer, setTimer] = useState<number | null>(null); // minutes

  const getEngine = () => (engine.current ??= new AmbientEngine());

  useEffect(() => () => engine.current?.stop(), []);

  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying && timer && elapsed >= timer * 60) {
      getEngine().stop();
      setIsPlaying(false);
      setTimer(null);
    }
  }, [elapsed, timer, isPlaying]);

  const start = (index: number) => {
    setCurrentTrack(index);
    setElapsed(0);
    getEngine().play(tracks[index].kind, volume / 100);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) {
      getEngine().stop();
      setIsPlaying(false);
    } else start(currentTrack);
  };

  const go = (dir: number) => {
    const i = (currentTrack + dir + tracks.length) % tracks.length;
    if (isPlaying) start(i);
    else setCurrentTrack(i);
  };

  return (
    <Card className="w-full max-w-md mx-auto healio-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Headphones className="h-6 w-6 text-primary" />
          Relaxing Sounds
        </CardTitle>
        <CardDescription>Calming soundscapes, played endlessly until you stop</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-br from-mind-100 to-healio-100 p-6 rounded-xl flex flex-col items-center justify-center">
          <div className={`w-20 h-20 healio-gradient rounded-full flex items-center justify-center mb-4 ${isPlaying ? 'animate-pulse-slow' : ''}`}>
            <Headphones className="w-10 h-10 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-lg">{tracks[currentTrack].title}</h3>
          <p className="text-muted-foreground">{tracks[currentTrack].artist}</p>
          <p className="text-xs text-muted-foreground mt-2">
            {isPlaying ? `Playing · ${fmt(elapsed)}` : 'Paused'}
            {timer ? ` · stops at ${timer} min` : ''}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-3">
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={() => go(-1)} aria-label="Previous">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button className="healio-gradient rounded-full h-12 w-12" size="icon" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10" onClick={() => go(1)} aria-label="Next">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <Slider
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) => { setVolume(v[0]); engine.current?.setVolume(v[0] / 100); }}
            className="flex-grow"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Timer className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Sleep timer:</span>
          {[15, 30, 60].map((m) => (
            <Button key={m} size="sm" variant={timer === m ? 'default' : 'outline'} onClick={() => { setTimer(timer === m ? null : m); setElapsed(0); }}>
              {m}m
            </Button>
          ))}
        </div>

        <div className="space-y-1">
          {tracks.map((track, index) => (
            <button
              key={track.title}
              className={`w-full text-left p-2 rounded-lg flex justify-between hover:bg-muted ${currentTrack === index ? 'bg-healio-50 border border-healio-200' : ''}`}
              onClick={() => start(index)}
            >
              <div>
                <p className="font-medium text-sm">{track.title}</p>
                <p className="text-xs text-muted-foreground">{track.artist}</p>
              </div>
              {currentTrack === index && isPlaying && <span className="text-xs text-primary self-center">Playing</span>}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MusicPlayer;
