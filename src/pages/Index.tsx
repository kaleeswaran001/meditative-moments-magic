
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MeditationTimer } from "@/components/MeditationTimer";
import { StreakDisplay } from "@/components/StreakDisplay";
import { SolfeggioPlayer } from "@/components/SolfeggioPlayer";
import { TodoList } from "@/components/TodoList";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [selectedDuration, setSelectedDuration] = useState(10);

  return (
    <div className="min-h-screen bg-gradient-to-b from-meditation-light to-white">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="heading-1">Meditative Moments</h1>
          <p className="text-muted-foreground">
            Find your inner peace, one breath at a time
          </p>
        </header>

        <div className="space-y-8">
          <StreakDisplay streak={5} />
          
          <Card className="glass-card p-6">
            <MeditationTimer 
              duration={selectedDuration}
              onDurationChange={setSelectedDuration}
            />
          </Card>

          <Card className="glass-card p-6">
            <SolfeggioPlayer />
          </Card>

          <Card className="glass-card p-6">
            <TodoList />
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;
