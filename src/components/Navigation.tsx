import { Link, useLocation } from "react-router-dom";
import { Calendar, BookOpen, Brain, MessageSquare, Award, Home, Users, CalendarDays, StickyNote, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/events", label: "Events", icon: Calendar },
  { to: "/resources", label: "Resources", icon: BookOpen },
  { to: "/quiz", label: "Quiz", icon: Brain },
  { to: "/doubts", label: "Doubts", icon: MessageSquare },
  { to: "/peer-studies", label: "Peer Studies", icon: Users },
  { to: "/planner", label: "Planner", icon: CalendarDays },
  { to: "/notes", label: "Notes", icon: StickyNote },
  { to: "/syllabus", label: "Syllabus", icon: ListChecks },
  { to: "/achievements", label: "Achievements", icon: Award },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <span className="text-lg font-bold text-primary-foreground">SB</span>
          </div>
          <span className="text-xl font-bold text-gradient-primary">Student Bridge</span>
        </Link>

        <div className="flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
