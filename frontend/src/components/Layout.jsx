import React from 'react';
import { LayoutDashboard, Users, FileText, Briefcase, Bell } from 'lucide-react';

export default function Layout({ children, currentTab, setCurrentTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors Directory', icon: Users },
    { id: 'quotations', label: 'Quotation Portal', icon: FileText },
  ];

  return (
    // Main Container - Deep Corporate Navy Blue Base
    <div className="flex min-h-screen bg-[#020c1b] text-[#f5f5dc] font-sans antialiased">
      
      {/* Sidebar Panel */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-[#1e2d42] bg-[#0a192f]/90 backdrop-blur-xl">
        
        {/* Top Brand Banner */}
        <div className="flex h-16 items-center px-6 border-b border-[#1e2d42]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f766e]/20 border border-[#14b8a6]/30 text-[#14b8a6]">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-md font-bold tracking-wider uppercase text-white">
              VMS <span className="text-[#14b8a6]">Core</span>
            </span>
          </div>
        </div>

        {/* Navigation Matrix Links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-[#0f766e] text-white shadow-md shadow-[#0f766e]/20 border border-[#14b8a6]/40'
                    : 'text-slate-400 hover:bg-[#172a45] hover:text-[#f5f5dc]'
                }`}
              >
                <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#14b8a6]'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer info container */}
        <div className="p-4 border-t border-[#1e2d42] bg-[#020c1b]/40 text-center">
          <p className="text-[11px] tracking-wide text-slate-500 uppercase font-medium">Procurement Management v1.0</p>
        </div>
      </aside>

      {/* Main Page Core Content Scaffold Wrapper */}
      <div className="pl-64 flex flex-col flex-1 w-full">
        
        {/* System Top Header */}
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-[#1e2d42] bg-[#0a192f]/60 px-8 backdrop-blur-md">
          <div>
            <h1 className="text-md font-bold tracking-wide text-white uppercase">
              {currentTab === 'dashboard' ? 'Procurement Analytics' : `${currentTab} workspace`}
            </h1>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative p-1.5 text-slate-400 hover:text-[#14b8a6] transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#14b8a6]"></span>
            </button>
            <div className="h-4 w-px bg-[#1e2d42]"></div>
            <div className="flex items-center gap-2.5">
              <div className="h-2 w-2 rounded-full bg-[#14b8a6] animate-pulse"></div>
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                Gateway Online
              </span>
            </div>
          </div>
        </header>

        {/* Workspace Dynamic Layout Scope viewport */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}