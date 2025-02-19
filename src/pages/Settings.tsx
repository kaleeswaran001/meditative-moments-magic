
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Navigation } from "@/components/Navigation";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-meditation-light to-white">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="heading-1">Settings</h1>
          <p className="text-muted-foreground">
            Customize your meditation experience
          </p>
        </header>

        <div className="space-y-8">
          <Card className="glass-card p-6">
            <h2 className="heading-2 mb-6">Preferences</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notification Sounds</h3>
                  <p className="text-sm text-muted-foreground">Play sounds for timer completion</p>
                </div>
                <Switch />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Volume</h3>
                <Slider
                  defaultValue={[80]}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Settings;
