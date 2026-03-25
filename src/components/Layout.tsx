import { Outlet, useLocation, useNavigate, Link } from "react-router";
import { BarChart3, Eye, MessageCircle, FileText, User } from "lucide-react";
import { useAuth } from "../lib/authContext";
import { useTabContext } from "../lib/tabContext";

type SubTabType = "live" | "favorite" | "unpurchased" | "purchased" | "stock" | "tutorial";

const navItems = [
  { path: "/home/stock-picker", label: "選股", icon: BarChart3 },
  { path: "/home/watchlist", label: "自選", icon: Eye },
  { path: "/home/discussion", label: "社團", icon: MessageCircle },
  { path: "/home/content", label: "內容", icon: FileText },
  { path: "/home/more", label: "會員", icon: User },
];

export function Layout() {
  const location = useLocation();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
        <div className="flex items-center justify-around h-16 max-w-screen-xl mx-auto px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path ||
              (item.path === "/home/stock-picker" && location.pathname === "/home");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}