"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { LogOut, User, Menu, Plus } from "lucide-react";
import logoImage from "@/assets/77ac9b30465e2a638fe36d43d6692e10b6bf92e1.png";
import { usePathname } from "next/navigation";

interface AdminHeaderProps {
  onMenuClick?: () => void;
  onAddNewPost?: () => void;
}

export function AdminHeader({ onMenuClick, onAddNewPost }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isBlogPage = pathname === "/admin/blog";

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
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMenuClick?.();
              }}
              className="lg:hidden text-slate-300 hover:text-white active:text-white p-2 rounded-lg hover:bg-slate-700 active:bg-slate-600 transition-all z-50 relative"
              style={{ touchAction: 'manipulation' }}
              aria-label="Open menu"
              type="button"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                onClick={handleLogoClick}
                className="flex items-center gap-2 sm:gap-3 cursor-pointer"
              >
                <img src={logoImage.src} alt="Vytrion Technologies" className="h-6 sm:h-8" />
                <span className="text-cyan-400 text-xs sm:text-sm bg-cyan-400/10 px-2 sm:px-3 py-1 rounded-full border border-cyan-400/30 whitespace-nowrap">
                  Admin Panel
                </span>
              </div>
              {isBlogPage && onAddNewPost && (
                <button
                  onClick={onAddNewPost}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 text-xs sm:text-sm whitespace-nowrap ml-2"
                >
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Add New Post</span>
                </button>
              )}
            </div>
          </div>

          {/* Admin User Info */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-sm">{user?.name || "Admin"}</p>
                <p className="text-slate-400 text-xs">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2 sm:px-4 py-2 rounded-lg transition-all border border-red-500/30"
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
