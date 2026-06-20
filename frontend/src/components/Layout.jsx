import React from 'react';
import { LayoutDashboard, Users, FileText, BarChart3, Menu } from 'lucide-react';

export default function Layout({ children, currentTab, setCurrentTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors Directory', icon: Users },
    { id: 'quotations', label: 'Quotations Management', icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Left Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl">
        {/* Branding Container */}
        <div className="flex h-16 items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              VMS Portal
            </span>
          </div>
        </div>

        {/* Navigation Sidebar Matrix Links */}
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/10'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-slate-950' : 'text-slate-400 group-hover:text-slate-200'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer info container */}
        <div className="p-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">Teyzix Core Procurement v1.0</p>
        </div>
      </aside>

      {/* Main Framework Core Wrapper Container */}
      <div className="pl-64 flex flex-col flex-1 w-full">
        {/* Top Header Panel */}
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-900/40 px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white capitalize">
              {currentTab === 'dashboard' ? 'Overview Analytics' : currentTab}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs font-medium text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50">
              System Live
            </span>
          </div>
        </header>

        {/* Dynamic Inner Application Page Scope Rendering Context */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}