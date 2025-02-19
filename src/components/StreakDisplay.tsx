
import { Flame } from "lucide-react";

interface StreakDisplayProps {
  streak: number;
}

export const StreakDisplay = ({ streak }: StreakDisplayProps) => {
  return (
    <div className="flex justify-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-500 border border-orange-200">
        <Flame className="w-5 h-5" />
        <span className="font-medium">{streak} Day Streak</span>
      </div>
    </div>
  );
};
