"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { LogOut, User } from "lucide-react";
import logoImage from "@/assets/77ac9b30465e2a638fe36d43d6692e10b6bf92e1.png";

export function AdminHeader() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleLogoClick = () => {
    // Admin logged in, keep them in admin UI
    router.push("/admin");
  };

  return (
    <header className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img src={logoImage.src} alt="Vytrion Technologies" className="h-8" />
            <span className="text-cyan-400 text-sm bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/30">
              Admin Panel
            </span>
          </div>

          {/* Admin User Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-sm">{user?.name || "Admin"}</p>
                <p className="text-slate-400 text-xs">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-4 py-2 rounded-lg transition-all border border-red-500/30"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
