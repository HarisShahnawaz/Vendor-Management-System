import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, Check, X, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import QuotationForm from './QuotationForm';

export default function QuotationList() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Matrix comparison search states
  const [compareTitle, setCompareTitle] = useState('');
  const [comparisonMatrix, setComparisonMatrix] = useState(null);
  const [matrixError, setMatrixError] = useState('');

  const fetchQuotations = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/quotations');
      const data = await res.json();
      if (res.ok) setQuotations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/quotations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Hot-reload current array view logs instantly
        fetchQuotations();
        if (comparisonMatrix) handleRunComparison(); // Sync active matrix highlights
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRunComparison = async () => {
    if (!compareTitle.trim()) return;
    setMatrixError('');
    try {
      const res = await fetch(`http://localhost:5000/api/quotations/compare?title=${encodeURIComponent(compareTitle)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'No proposals discovered');
      setComparisonMatrix(data);
    } catch (err) {
      setComparisonMatrix(null);
      setMatrixError(err.message);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-[#f5f5dc]">
      
      {/* Upper Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Procurement Vault</p>
          <h2 className="text-xl font-bold text-white mt-0.5">Quotations Distribution History</h2>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center justify-center gap-2 rounded-lg bg-[#0f766e] border border-[#14b8a6]/40 px-4 py-2 text-xs font-bold text-white hover:bg-[#115e59] shadow-md self-start sm:self-center">
          <Plus className="h-4 w-4" /> Create Quotation Request
        </button>
      </div>

      {/* --- SECTION A: LIVE COMPARISON MATRIX SHIELD PANEL --- */}
      <div className="rounded-xl border border-[#1e2d42] bg-[#0a192f]/40 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 mb-4 text-white">
          <BarChart3 className="h-5 w-5 text-[#14b8a6]" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Side-by-Side Bid Analysis Matrix</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-4">
          <input type="text" placeholder="Enter exactly standard proposal title (e.g. Server Procurement)" value={compareTitle} onChange={(e) => setCompareTitle(e.target.value)} className="w-full rounded-lg border border-[#1e2d42] bg-[#020c1b] px-3.5 py-1.5 text-sm placeholder-slate-600 text-white focus:border-[#14b8a6] focus:outline-none" />
          <button onClick={handleRunComparison} className="rounded-lg bg-[#172a45] hover:bg-[#1e2d42] px-4 py-1.5 text-xs font-bold text-[#14b8a6] tracking-wide border border-[#14b8a6]/20 shrink-0">
            Analyze Cost Matrix
          </button>
        </div>

        {matrixError && (
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
            <AlertCircle className="h-4 w-4 shrink-0" /> {matrixError}
          </div>
        )}

        {comparisonMatrix && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="rounded-lg bg-[#0f766e]/10 border border-[#14b8a6]/20 p-3.5 text-xs text-[#14b8a6] font-medium">
              🎉 System Optimization Highlight: The most cost-effective bid option is highlighted in <span className="underline font-bold">Teal-Green</span> below.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonMatrix.summaryList.map((bid) => {
                const isCheapest = bid._id === comparisonMatrix.cheapestOptionId;
                return (
                  <div key={bid._id} className={`rounded-lg border p-4.5 transition-all relative ${
                    isCheapest 
                      ? 'bg-[#0f766e]/20 border-[#14b8a6] shadow-lg shadow-[#14b8a6]/5' 
                      : 'bg-[#020c1b]/60 border-[#1e2d42]'
                  }`}>
                    {isCheapest && (
                      <span className="absolute top-2.5 right-2.5 bg-[#14b8a6] text-slate-950 font-bold text-[10px] tracking-widest px-1.5 py-0.5 rounded uppercase">
                        Lowest Bid
                      </span>
                    )}
                    <h4 className="font-bold text-white truncate pr-16">{bid.vendorId?.companyName || 'Unknown Vendor'}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Agent: {bid.vendorId?.name}</p>
                    
                    <div className="mt-4 flex items-baseline justify-between border-t border-[#1e2d42]/60 pt-3">
                      <span className="text-xs text-slate-400 font-medium">Bid Amount:</span>
                      <span className={`text-lg font-black ${isCheapest ? 'text-[#14b8a6]' : 'text-white'}`}>
                        ${bid.quotationAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Status Reference:</span>
                      <span className={`font-semibold ${bid.status === 'Approved' ? 'text-emerald-400' : bid.status === 'Rejected' ? 'text-red-400' : 'text-amber-400'}`}>{bid.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* --- SECTION B: MASTER TRANSACTION TRANSACTION REPOSITORY TABLE --- */}
      <div className="overflow-hidden rounded-xl border border-[#1e2d42] bg-[#0a192f]/20 backdrop-blur-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Querying quotation history...</div>
        ) : quotations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No recorded procurement quotation transactions filed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#1e2d42] bg-[#0a192f]/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Scope Title Requirements</th>
                  <th className="px-6 py-4">Assigned Vendor Vendor</th>
                  <th className="px-6 py-4">Ref Code & Amount</th>
                  <th className="px-6 py-4">Workflow Status</th>
                  <th className="px-6 py-4 text-center">Manage Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2d42]">
                {quotations.map((quote) => (
                  <tr key={quote._id} className="hover:bg-[#172a45]/30 transition-colors">
                    <td className="px-6 py-4.5 max-w-xs">
                      <div className="font-bold text-white text-sm mb-0.5">{quote.title}</div>
                      <div className="text-xs text-slate-400 font-medium line-clamp-1">{quote.description}</div>
                    </td>
                    <td className="px-6 py-4.5 text-xs">
                      <div className="font-semibold text-white">{quote.vendorId?.companyName || 'N/A'}</div>
                      <div className="text-slate-500">{quote.vendorId?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4.5 text-xs">
                      <div className="text-slate-400 mb-0.5 font-mono">{quote.vendorReference}</div>
                      <div className="font-bold text-white text-sm">${quote.quotationAmount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4.5 text-xs">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${
                        quote.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        quote.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${quote.status === 'Approved' ? 'bg-emerald-400' : quote.status === 'Rejected' ? 'bg-red-400' : 'bg-amber-400'}`}></span>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => handleStatusUpdate(quote._id, 'Approved')} className="p-1.5 bg-emerald-500/5 hover:bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/10 transition-colors" title="Approve Quotation Contract">
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => handleStatusUpdate(quote._id, 'Rejected')} className="p-1.5 bg-red-500/5 hover:bg-red-500/20 text-red-400 rounded border border-red-500/10 transition-colors" title="Reject Bid">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm && (
        <QuotationForm onClose={() => setShowForm(false)} onQuotationAdded={fetchQuotations} />
      )}
    </div>
  );
}