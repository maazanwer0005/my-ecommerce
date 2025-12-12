"use client";

import { ReactNode, useState } from "react";
import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";
import { Sheet, SheetContent } from "../ui/sheet";

interface AdminLayoutProps {
  children: ReactNode;
  onAddNewPost?: () => void;
}

export function AdminLayout({ children, onAddNewPost }: AdminLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setMobileMenuOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <AdminHeader onMenuClick={handleMenuClick} onAddNewPost={onAddNewPost} />
      <div className="flex">
        {/* Desktop Sidebar */}
        <AdminSidebar />
        
        {/* Mobile Sidebar */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="w-64 p-0 bg-slate-800 border-slate-700 z-[100]">
            <AdminSidebar isMobile={true} onItemClick={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
