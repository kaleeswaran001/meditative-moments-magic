
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-meditation-light to-white flex flex-col items-center justify-center p-4 text-center">
      <div className="animate-fade-in space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Leaf className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">Meditative Moments</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Begin your journey to mindfulness and inner peace through guided
            meditation sessions.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate("/auth")}
            size="lg"
            className="w-full max-w-sm"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Splash;
