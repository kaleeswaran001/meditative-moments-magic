
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { StreakDisplay } from "@/components/StreakDisplay";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays } from "date-fns";

interface MeditationStats {
  totalSessions: number;
  totalMinutes: number;
  streak: number;
  averageMinutes: number;
}

interface DailySession {
  date: string;
  minutes: number;
}

const Progress = () => {
  const [stats, setStats] = useState<MeditationStats>({
    totalSessions: 0,
    totalMinutes: 0,
    streak: 0,
    averageMinutes: 0,
  });
  const [dailyData, setDailyData] = useState<DailySession[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMeditationData();
  }, []);

  const fetchMeditationData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch user profile stats
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setStats({
          totalSessions: profile.total_sessions || 0,
          totalMinutes: profile.total_minutes || 0,
          streak: profile.streak || 0,
          averageMinutes: profile.total_sessions
            ? Math.round(profile.total_minutes / profile.total_sessions)
            : 0,
        });
      }

      // Fetch last 7 days of meditation sessions
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), i);
        return format(date, "yyyy-MM-dd");
      }).reverse();

      const { data: sessions } = await supabase
        .from("meditation_sessions")
        .select("duration, completed_at")
        .eq("user_id", user.id)
        .gte("completed_at", last7Days[0]);

      const dailyMinutes = last7Days.map((date) => ({
        date: format(new Date(date), "MMM d"),
        minutes: sessions
          ?.filter(
            (session) =>
              format(new Date(session.completed_at), "yyyy-MM-dd") === date
          )
          .reduce((sum, session) => sum + session.duration, 0) || 0,
      }));

      setDailyData(dailyMinutes);
    } catch (error) {
      console.error("Error fetching meditation data:", error);
      toast({
        title: "Error",
        description: "Failed to load meditation progress",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-meditation-light to-white flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          Loading your progress...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-meditation-light to-white">
      <div className="container max-w-4xl mx-auto px-4 py-8 pb-24">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="heading-1">Your Progress</h1>
          <p className="text-muted-foreground">Track your meditation journey</p>
        </header>

        <div className="space-y-8">
          <StreakDisplay streak={stats.streak} />

          <Card className="glass-card p-6">
            <h2 className="heading-2 mb-6">Meditation Stats</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-meditation-light rounded-lg">
                <div className="text-3xl font-light text-primary">
                  {stats.totalSessions}
                </div>
                <div className="text-sm text-muted-foreground">Total Sessions</div>
              </div>
              <div className="text-center p-4 bg-meditation-light rounded-lg">
                <div className="text-3xl font-light text-primary">
                  {stats.totalMinutes}
                </div>
                <div className="text-sm text-muted-foreground">Total Minutes</div>
              </div>
              <div className="text-center p-4 bg-meditation-light rounded-lg">
                <div className="text-3xl font-light text-primary">
                  {stats.averageMinutes}
                </div>
                <div className="text-sm text-muted-foreground">
                  Avg Minutes/Session
                </div>
              </div>
              <div className="text-center p-4 bg-meditation-light rounded-lg">
                <div className="text-3xl font-light text-primary">
                  {stats.streak}
                </div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <h2 className="heading-2 mb-6">Last 7 Days</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="minutes"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Progress;
