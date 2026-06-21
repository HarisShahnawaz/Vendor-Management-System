import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { ArrowUpRight, ShieldAlert, Layers, CheckCircle2, Clock } from 'lucide-react';
import VendorsList from './components/VendorsList';
import QuotationList from './components/QuotationList'; // 1. IMPORT QUOTATION HANDLER COMPONENT

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [stats, setStats] = useState({
    totalVendors: 0,
    activeQuotations: 0,
    pendingQuotations: 0,
    approvedQuotations: 0,
    recentActivities: []
  });
  const [loading, setLoading] = useState(true);

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
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      
      {/* 1. DASHBOARD COMPONENT SEGMENT */}
      {currentTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          <div className="relative overflow-hidden rounded-xl border border-[#1e2d42] bg-[#0a192f]/40 p-8 backdrop-blur-sm">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-[#0f766e]/10 blur-2xl"></div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Welcome Back Portal Engine 👋</h2>
            <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
              Coordinate enterprise procurement, track vendor verification streams, evaluate incoming cost estimates side-by-side, and approve optimal quotation allocations seamlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Active Vendors', count: `${stats.totalVendors} Profiles`, icon: Layers, color: 'text-[#14b8a6]' },
              { label: 'Active Quotations', count: `${stats.activeQuotations} Requests`, icon: ArrowUpRight, color: 'text-[#14b8a6]' },
              { label: 'Pending Quotations', count: `${stats.pendingQuotations} Reviewing`, icon: ShieldAlert, color: 'text-amber-400' },
              { label: 'Approved Contracts', count: `${stats.approvedQuotations} Bids`, icon: CheckCircle2, color: 'text-emerald-400' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="rounded-xl border border-[#1e2d42] bg-[#0a192f]/30 p-5 backdrop-blur-sm hover:border-[#0f766e]/60 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{card.label}</span>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <p className="text-xl font-bold text-white tracking-tight">
                    {loading ? <span className="text-sm font-normal text-slate-500 animate-pulse">Loading...</span> : card.count}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-xl border border-[#1e2d42] bg-[#0a192f]/20 p-6">
            <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#14b8a6]" /> Live System Logistics Pipeline
            </h3>
            
            {loading ? (
              <div className="p-8 text-center text-slate-500 text-sm">Synchronizing live history feeds...</div>
            ) : stats.recentActivities.length === 0 ? (
              <div className="border border-dashed border-[#1e2d42] rounded-lg p-8 text-center text-slate-500 text-sm">
                No recent quotation activities or vendor logs registered yet.
              </div>
            ) : (
              <div className="flow-root">
                <ul className="-mb-8">
                  {stats.recentActivities.map((activity, actIdx) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {actIdx !== stats.recentActivities.length - 1 ? (
                          <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-[#1e2d42]" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-[#020c1b] ${
                              activity.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              activity.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              <ArrowUpRight className="h-4 w-4" />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-[#f5f5dc]">{activity.text}</p>
                            </div>
                            <div className="text-right text-xs whitespace-nowrap text-slate-400 space-y-1">
                              <div className="font-bold text-white">${activity.amount.toLocaleString()}</div>
                              <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                                activity.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20' :
                                activity.status === 'Rejected' ? 'bg-red-500/10 text-red-400 ring-red-500/20' :
                                'bg-amber-500/10 text-amber-400 ring-amber-500/20'
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