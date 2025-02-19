
import { Home, Calendar, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white/80 backdrop-blur-sm">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="flex justify-around py-4">
          <Link 
            to="/" 
            className={`nav-item ${location.pathname === "/" ? "text-primary" : ""}`}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link 
            to="/progress" 
            className={`nav-item ${location.pathname === "/progress" ? "text-primary" : ""}`}
          >
            <Calendar className="h-5 w-5" />
            <span>Progress</span>
          </Link>
          <Link 
            to="/settings" 
            className={`nav-item ${location.pathname === "/settings" ? "text-primary" : ""}`}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};
