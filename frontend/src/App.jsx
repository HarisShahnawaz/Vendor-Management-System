import React, { useState } from 'react';
import Layout from './components/Layout';

function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  return (
    <Layout currentTab={currentTab} setCurrentTab={setCurrentTab}>
      {/* Conditional UI Workspace Render Mapping */}
      {currentTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back! 👋</h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Monitor active quotation distributions, compare current incoming vendor bid proposals side-by-side, and coordinate structural corporate procurement workflows seamlessly.
            </p>
          </div>
        </div>
      )}

      {currentTab === 'vendors' && (
        <div className="p-6 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500">
          Vendors Directory Directory Component Coming Next Slot...
        </div>
      )}

      {currentTab === 'quotations' && (
        <div className="p-6 border border-dashed border-slate-800 rounded-2xl text-center text-slate-500">
          Quotations Management Grid Component Coming Next Slot...
        </div>
      )}
    </Layout>
  );
}

export default App;