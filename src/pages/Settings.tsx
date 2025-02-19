
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Navigation } from "@/components/Navigation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface UserSettings {
  notification_sounds: boolean;
  volume: number;
  dark_mode: boolean;
}

const Settings = () => {
  const [settings, setSettings] = useState<UserSettings>({
    notification_sounds: true,
    volume: 80,
    dark_mode: false,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please sign in to access settings",
          variant: "destructive",
        });
        return;
      }

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        setSettings({
          notification_sounds: data.notification_sounds,
          volume: data.volume,
          dark_mode: data.dark_mode,
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to load settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: keyof UserSettings, value: boolean | number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Not authenticated",
          description: "Please sign in to update settings",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_settings')
        .update({ 
          [key]: value,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setSettings(prev => ({ ...prev, [key]: value }));
      toast({
        title: "Settings updated",
        description: "Your changes have been saved",
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-meditation-light to-white flex items-center justify-center">
        <div className="text-center text-muted-foreground">Loading settings...</div>
      </div>
    );
  }

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
                <Switch 
                  checked={settings.notification_sounds}
                  onCheckedChange={(checked) => updateSetting('notification_sounds', checked)}
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Volume</h3>
                <Slider
                  value={[settings.volume]}
                  onValueChange={([value]) => updateSetting('volume', value)}
                  max={100}
                  step={1}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-muted-foreground">Enable dark theme</p>
                </div>
                <Switch 
                  checked={settings.dark_mode}
                  onCheckedChange={(checked) => updateSetting('dark_mode', checked)}
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
