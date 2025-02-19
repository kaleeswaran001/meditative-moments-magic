
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

interface MeditationTimerProps {
  duration: number;
  onDurationChange: (duration: number) => void;
}

export const MeditationTimer = ({ duration, onDurationChange }: MeditationTimerProps) => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(duration * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="heading-2 text-center">Meditation Timer</h2>
      
      <div className="meditation-circle">
        <span className="text-4xl font-light">{formatTime(timeLeft)}</span>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTimer}
          className="w-12 h-12 rounded-full"
        >
          {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={resetTimer}
          className="w-12 h-12 rounded-full"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      <div className="w-full max-w-sm space-y-2">
        <label className="text-sm text-muted-foreground text-center block">
          Duration: {duration} minutes
        </label>
        <Slider
          value={[duration]}
          onValueChange={([value]) => onDurationChange(value)}
          min={1}
          max={60}
          step={1}
          className="w-full"
        />
      </div>
    </div>
  );
};
