
import { Home, Calendar, Settings } from "lucide-react";

export const Navigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white/80 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-around py-4">
          <button className="nav-item">
            <Home className="h-5 w-5" />
            <span>Home</span>
          </button>
          <button className="nav-item">
            <Calendar className="h-5 w-5" />
            <span>Progress</span>
          </button>
          <button className="nav-item">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
