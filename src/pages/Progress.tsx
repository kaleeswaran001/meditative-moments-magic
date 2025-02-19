
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";

const Progress = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-meditation-light to-white">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="heading-1">Your Progress</h1>
          <p className="text-muted-foreground">
            Track your meditation journey
          </p>
        </header>

        <div className="space-y-8">
          <Card className="glass-card p-6">
            <h2 className="heading-2 mb-6">Meditation Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-meditation-light rounded-lg">
                <div className="text-3xl font-light text-primary">12</div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
              </div>
              <div className="text-center p-4 bg-meditation-light rounded-lg">
                <div className="text-3xl font-light text-primary">180</div>
                <div className="text-sm text-muted-foreground">Total Minutes</div>
              </div>
              <div className="text-center p-4 bg-meditation-light rounded-lg">
                <div className="text-3xl font-light text-primary">15</div>
                <div className="text-sm text-muted-foreground">Avg Minutes/Session</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Progress;
