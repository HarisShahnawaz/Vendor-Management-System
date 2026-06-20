import React, { useState } from 'react';
import Layout from './components/Layout';
import { ArrowUpRight, ShieldAlert, Layers, CheckCircle2 } from 'lucide-react';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      
      {/* 1. DASHBOARD OVERVIEW VIEW CHANNEL */}
      {currentTab === 'dashboard' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Welcome Dashboard Banner Header */}
          <div className="relative overflow-hidden rounded-xl border border-[#1e2d42] bg-[#0a192f]/40 p-8 backdrop-blur-sm">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-[#0f766e]/10 blur-2xl"></div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Welcome Back Portal Engine 👋</h2>
            <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
              Coordinate enterprise procurement, track vendor verification streams, evaluate incoming cost estimates side-by-side, and approve optimal quotation allocations seamlessly.
            </p>
          </div>

          {/* Quick Mock Metric Grid Indicators */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Active Vendors', count: '12 Profiles', icon: Layers, color: 'text-[#14b8a6]' },
              { label: 'Pending Quotations', count: '4 Requests', icon: ShieldAlert, color: 'text-amber-400' },
              { label: 'Approved Contracts', count: '8 Bids', icon: CheckCircle2, color: 'text-emerald-400' },
              { label: 'Cost Savings Optimization', count: '14.2%', icon: ArrowUpRight, color: 'text-[#14b8a6]' },
            ].map((card, idx) => {
              const Icon = card.icon;
              return (
                <div key={idx} className="rounded-xl border border-[#1e2d42] bg-[#0a192f]/30 p-5 backdrop-blur-sm hover:border-[#0f766e]/60 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">{card.label}</span>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <p className="text-xl font-bold text-white tracking-tight">{card.count}</p>
                </div>
              );
            })}
          </div>

          {/* Activity Logs & Preview Framework Segment Box */}
          <div className="rounded-xl border border-[#1e2d42] bg-[#0a192f]/20 p-6">
            <h3 className="text-sm font-bold tracking-wider text-white uppercase mb-4">Live System Logistics Pipeline</h3>
            <div className="border border-dashed border-[#1e2d42] rounded-lg p-8 text-center text-slate-500 text-sm">
              Dashboard integration analytics data loops rendering stream ready...
            </div>
          </div>

        </div>
      )}

      {/* 2. VENDORS REPOSITORY PLACEHOLDER */}
      {currentTab === 'vendors' && (
        <div className="rounded-xl border border-[#1e2d42] bg-[#0a192f]/20 p-12 text-center animate-fade-in">
          <p className="text-sm tracking-wide text-slate-400 font-medium uppercase mb-2">Vendors Database Matrix Component</p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">Connecting data arrays for adding, filtering, searching, and managing strategic profile systems.</p>
        </div>
      )}

      {/* 3. QUOTATIONS TRANSACTIONS PORTAL PLACEHOLDER */}
      {currentTab === 'quotations' && (
        <div className="rounded-xl border border-[#1e2d42] bg-[#0a192f]/20 p-12 text-center animate-fade-in">
          <p className="text-sm tracking-wide text-slate-400 font-medium uppercase mb-2">Quotation Distribution Comparison Matrix</p>
          <p className="text-xs text-slate-500 max-w-md mx-auto">Evaluating pricing sheets side-by-side and rendering visual badges targeting optimal budgets.</p>
        </div>
      )}

    </Layout>
  );
}

export default App;