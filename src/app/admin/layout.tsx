"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  Image as ImageIcon, 
  FileText, 
  Settings, 
  LogOut, 
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Applications", href: "/admin/applications", icon: FileText },
  { name: "Contact Messages", href: "/admin/contacts", icon: FileText },
  { name: "Models (Men)", href: "/admin/models/men", icon: Users },
  { name: "Models (Women)", href: "/admin/models/women", icon: Users },
  { name: "Campaigns (Jobs)", href: "/admin/campaigns", icon: ImageIcon },
  { name: "Activity Logs", href: "/admin/logs", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Don't show sidebar on login page
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white font-sans">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-72 bg-neutral-900 border-r border-neutral-800 fixed h-screen z-40 transition-all duration-300">
        <div className="p-8 border-b border-neutral-800">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">WK</div>
            <span className="font-serif text-xl font-medium tracking-tight">Admin <span className="text-neutral-500 font-sans text-xs uppercase tracking-widest ml-1">v3.0</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                  isActive 
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                    : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                {link.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-800 bg-neutral-900/50 backdrop-blur">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            View Website
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-neutral-400 hover:text-white transition-colors mt-1"
          >
            <ChevronRight className="w-5 h-5 rotate-180" />
            Home
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors mt-2 w-full text-left"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 bg-neutral-900 z-50 lg:hidden transform transition-transform duration-300 ease-in-out",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold uppercase transition-transform">WK</div>
            <span className="font-serif text-xl font-medium tracking-tight">Admin</span>
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6 text-neutral-400" />
          </button>
        </div>
        <nav className="p-4 space-y-1 mt-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group",
                  isActive ? "bg-white text-black" : "text-neutral-400 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-72 min-h-screen relative flex flex-col">
        {/* Top Header - Mobile Only */}
        <header className={cn(
          "lg:hidden h-16 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between px-6 sticky top-0 z-30",
          !pathname.startsWith("/admin/login") ? "" : "hidden"
        )}>
          <button onClick={() => setIsMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="w-8 h-8 bg-white text-black rounded flex items-center justify-center font-bold">WK</div>
          <div className="w-6 h-6" /> {/* Spacer */}
        </header>

        {/* Dynamic Dashboard Page Content */}
        <div className="p-6 lg:p-10 flex-1 overflow-x-hidden">
          {children}
        </div>
        
        {/* Admin Footer */}
        <footer className="p-6 lg:px-10 border-t border-neutral-900 text-neutral-600 text-xs flex justify-between items-center opacity-50">
          <p>© 2026 WhoKnows Models Management</p>
          <p>System v3.0.4-Edge</p>
        </footer>
      </main>
    </div>
  );
}
