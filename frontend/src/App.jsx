import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { ArrowUpRight, ShieldAlert, Layers, CheckCircle2, Clock } from 'lucide-react';
import VendorsList from './components/VendorsList';
import QuotationList from './components/QuotationList'; // 1. IMPORT QUOTATION HANDLER COMPONENT

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeQuotations: 0,
    pendingQuotations: 0,
    approvedQuotations: 0,
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/dashboard/stats');
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    } catch (err) {
      console.error("Error linking dashboard metrics matrix stream:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentTab === 'dashboard') {
      fetchDashboardStats();
    }
  }, [currentTab]);

  return (
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab} darkMode={darkMode} toggleTheme={toggleTheme}>
      
      {/* 1. DASHBOARD COMPONENT SEGMENT */}
      {currentTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f]/40 p-8 shadow-sm">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-teal-100 dark:bg-teal-900/30 blur-2xl"></div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">Welcome Back Portal Engine 👋</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-3xl leading-relaxed">
              Coordinate enterprise procurement, track vendor verification streams, evaluate incoming cost estimates side-by-side, and approve optimal quotation allocations seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Active Vendors', count: `${stats.totalVendors} Profiles`, icon: Layers, color: 'text-teal-600' },
              { label: 'Active Quotations', count: `${stats.activeQuotations} Requests`, icon: ArrowUpRight, color: 'text-teal-600' },
              { label: 'Pending Quotations', count: `${stats.pendingQuotations} Reviewing`, icon: ShieldAlert, color: 'text-amber-600' },
              { label: 'Approved Contracts', count: `${stats.approvedQuotations} Bids`, icon: CheckCircle2, color: 'text-emerald-600' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f]/40 p-5 shadow-sm hover:border-teal-300 dark:hover:border-teal-600 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">{card.label}</span>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <p className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {loading ? <span className="text-sm font-normal text-slate-500 dark:text-slate-400 animate-pulse">Loading...</span> : card.count}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f]/40 p-6 shadow-sm">
            <h3 className="text-sm font-bold tracking-wider text-slate-900 dark:text-white uppercase mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-teal-600" /> Live System Logistics Pipeline
            </h3>
            
            {loading ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400 text-sm">Synchronizing live history feeds...</div>
            ) : stats.recentActivities.length === 0 ? (
              <div className="border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-8 text-center text-slate-500 dark:text-slate-400 text-sm">
                No recent quotation activities or vendor logs registered yet.
              </div>
            ) : (
              <div className="flow-root">
                <ul className="-mb-8">
                  {stats.recentActivities.map((activity, actIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {actIdx !== stats.recentActivities.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-[#0a192f] ${
                              activity.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700' :
                              activity.status === 'Rejected' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-700' :
                              'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-700'
                            }`}>
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-slate-800 dark:text-slate-300">{activity.text}</p>
                            </div>
                            <div className="text-right text-xs whitespace-nowrap text-slate-500 dark:text-slate-400 space-y-1">
                              <div className="font-bold text-slate-900 dark:text-white">${activity.amount.toLocaleString()}</div>
                              <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                                activity.status === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 ring-emerald-200 dark:ring-emerald-700' :
                                activity.status === 'Rejected' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 ring-red-200 dark:ring-red-700' :
                                'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 ring-amber-200 dark:ring-amber-700'
                              }`}>
                                {activity.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. VENDORS MANAGEMENT VIEW PANEL */}
      {currentTab === 'vendors' && (
        <VendorsList />
      )}

      {/* 3. LIVE QUOTATION PORTAL & ANALYSIS TOOL */}
      {currentTab === 'quotations' && (
        <QuotationList /> // MOUNT COMPLETE WORKSPACE HERE
      )}

    </Layout>
  );
}

export default App;