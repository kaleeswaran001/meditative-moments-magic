
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";

const frequencies = [
  { hz: "174", name: "Pain Relief" },
  { hz: "285", name: "Energy Flow" },
  { hz: "396", name: "Liberation" },
  { hz: "417", name: "Facilitation of Change" },
  { hz: "528", name: "DNA Repair" },
  { hz: "639", name: "Relationships" },
  { hz: "741", name: "Expression/Solutions" },
  { hz: "852", name: "Spiritual Order" },
  { hz: "963", name: "Divine Consciousness" },
];

export const SolfeggioPlayer = () => {
  const [activeFrequency, setActiveFrequency] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="heading-2">Solfeggio Frequencies</h2>
      <div className="grid grid-cols-3 gap-3">
        {frequencies.map((freq) => (
          <Button
            key={freq.hz}
            variant={activeFrequency === freq.hz ? "default" : "outline"}
            className="flex flex-col items-center p-4 h-auto"
            onClick={() => setActiveFrequency(freq.hz)}
          >
            <Volume2 className="h-5 w-5 mb-1" />
            <span className="text-lg font-medium">{freq.hz}Hz</span>
            <span className="text-xs text-muted-foreground">{freq.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
