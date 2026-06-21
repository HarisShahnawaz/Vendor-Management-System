import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, FileText, Briefcase, Bell, Menu, X, Sun, Moon } from 'lucide-react';

export default function Layout({ children, currentTab, setCurrentTab, darkMode, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'vendors', label: 'Vendors Directory', icon: Users },
    { id: 'quotations', label: 'Quotation Portal', icon: FileText },
  ];

  return (
    // Main Container - Clean Light Theme Base
    <div className="flex min-h-screen bg-[#f8fafc] dark:bg-[#020c1b] text-slate-900 dark:text-white font-sans antialiased">
      
      {/* Sidebar Panel - Hidden on mobile, visible on desktop */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-20 w-64 flex-col border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0a192f] backdrop-blur-xl">
        
        {/* Top Brand Banner */}
        <div className="flex h-16 items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-md font-bold tracking-wider uppercase text-slate-900 dark:text-white">
              VMS <span className="text-teal-600">Core</span>
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
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer info container */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a192f]/40 text-center">
          <p className="text-[11px] tracking-wide text-slate-500 dark:text-slate-400 uppercase font-medium">Procurement Management v1.0</p>
        </div>
      </aside>

      {/* Mobile Slide-over Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Mobile Drawer */}
          <aside className="fixed inset-y-0 left-0 z-40 w-72 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f] backdrop-blur-xl md:hidden flex">
            
            {/* Top Brand Banner with Close Button */}
            <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-600 text-white">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span className="text-md font-bold tracking-wider uppercase text-slate-900 dark:text-white">
                  VMS <span className="text-teal-600">Core</span>
                </span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Matrix Links */}
            <nav className="flex-1 space-y-1.5 px-4 py-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex w-full items-center gap-3.5 rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-200 group ${
                      isActive
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Footer info container */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a192f]/40 text-center">
              <p className="text-[11px] tracking-wide text-slate-500 dark:text-slate-400 uppercase font-medium">Procurement Management v1.0</p>
            </div>
          </aside>
        </>
      )}

      {/* Main Page Core Content Scaffold Wrapper */}
      <div className="flex flex-col flex-1 w-full md:pl-64">
        
        {/* System Top Header */}
        <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f] px-4 md:px-8 backdrop-blur-md">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu Button - Mobile Only */}
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-md font-bold tracking-wide text-slate-900 dark:text-white uppercase">
              {currentTab === 'dashboard' ? 'Procurement Analytics' : `${currentTab} workspace`}
            </h1>
          </div>
          
          <div className="flex items-center gap-5">
            <button className="relative p-1.5 text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-teal-600"></span>
            </button>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-teal-600 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <div className="flex items-center gap-2.5">
              <div className={`bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border border-teal-200/70 dark:border-teal-700/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm`}>
                <div className={`h-2 w-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-rose-500'} ${isOnline ? 'animate-pulse' : ''}`}></div>
                {isOnline ? 'Gateway Online' : 'Gateway Offline'}
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Dynamic Layout Scope viewport */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}