import React, { useState, useEffect, useMemo } from 'react';
import { Plus, BarChart3, Check, X, ShieldAlert, CheckCircle2, AlertCircle, Filter, ArrowUpDown, Eye, Search } from 'lucide-react';
import QuotationForm from './QuotationForm';
import ViewQuotationModal from './ViewQuotationModal';

export default function QuotationList() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Matrix comparison search states
  const [compareTitle, setCompareTitle] = useState('');
  const [comparisonMatrix, setComparisonMatrix] = useState(null);
  const [matrixError, setMatrixError] = useState('');

  // Sorting and filtering states
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');

  // View modal state
  const [selectedQuotation, setSelectedQuotation] = useState(null);

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
    
    // Calculate total cost of matching quotes locally
    const matchingQuotes = quotations.filter(q => 
      q.title.toLowerCase().includes(compareTitle.toLowerCase())
    );
    
    if (matchingQuotes.length > 0) {
      const totalCost = matchingQuotes.reduce((sum, q) => sum + q.quotationAmount, 0);
      alert(`📊 Bid Analysis Summary\n\nProposal Title: "${compareTitle}"\nMatching Quotes: ${matchingQuotes.length}\nTotal Cost: $${totalCost.toLocaleString()}\n\nAverage Cost: $${(totalCost / matchingQuotes.length).toLocaleString()}`);
    } else {
      alert(`⚠️ No matching quotes found for proposal title: "${compareTitle}"`);
    }
    
    // Continue with API call for detailed comparison matrix
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

  // Filter and sort quotations
  const filteredAndSortedQuotations = useMemo(() => {
    let filtered = quotations;
    
    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(q => 
        q.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(q => q.status === statusFilter);
    }
    
    // Apply sorting
    const sorted = [...filtered];
    if (sortBy === 'priceLowHigh') {
      sorted.sort((a, b) => a.quotationAmount - b.quotationAmount);
    } else if (sortBy === 'priceHighLow') {
      sorted.sort((a, b) => b.quotationAmount - a.quotationAmount);
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return sorted;
  }, [quotations, statusFilter, sortBy, searchTerm]);

  return (
    <div className="space-y-8 animate-fade-in text-slate-900">
      
      {/* Upper Action bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500 font-semibold tracking-wider uppercase">Procurement Vault</p>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">Quotations Distribution History</h2>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 border border-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm self-start sm:self-center active:scale-95 transition-transform">
          <Plus className="h-4 w-4" /> Create Quotation Request
        </button>
      </div>

      {/* --- SECTION A: LIVE COMPARISON MATRIX SHIELD PANEL --- */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4 text-slate-900">
          <BarChart3 className="h-5 w-5 text-teal-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider">Side-by-Side Bid Analysis Matrix</h3>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mb-4">
          <input type="text" placeholder="Enter exactly standard proposal title (e.g. Server Procurement)" value={compareTitle} onChange={(e) => setCompareTitle(e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-1.5 text-sm placeholder-slate-400 text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none" />
          <button onClick={handleRunComparison} className="rounded-lg bg-slate-100 hover:bg-slate-200 px-4 py-1.5 text-xs font-bold text-teal-600 tracking-wide border border-slate-300 shrink-0">
            Analyze Cost Matrix
          </button>
        </div>

        {matrixError && (
          <div className="flex items-center gap-2 text-xs text-amber-700 font-medium bg-amber-50 border border-amber-200 rounded-lg p-3">
            <AlertCircle className="h-4 w-4 shrink-0" /> {matrixError}
          </div>
        )}

        {comparisonMatrix && (
          <div className="mt-6 space-y-4 animate-fade-in">
            <div className="rounded-lg bg-teal-50 border border-teal-200 p-3.5 text-xs text-teal-700 font-medium">
              🎉 System Optimization Highlight: The most cost-effective bid option is highlighted in <span className="underline font-bold">Teal</span> below.
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparisonMatrix.summaryList.map((bid) => {
                const isCheapest = bid._id === comparisonMatrix.cheapestOptionId;
                return (
                  <div key={bid._id} className={`rounded-lg border p-4.5 transition-all relative ${
                    isCheapest 
                      ? 'bg-teal-50 border-teal-300 shadow-lg shadow-teal-100' 
                      : 'bg-slate-50 border-slate-200'
                  }`}>
                    {isCheapest && (
                      <span className="absolute top-2.5 right-2.5 bg-teal-600 text-white font-bold text-[10px] tracking-widest px-1.5 py-0.5 rounded uppercase">
                        Lowest Bid
                      </span>
                    )}
                    <h4 className="font-bold text-slate-900 truncate pr-16">{bid.vendorId?.companyName || 'Unknown Vendor'}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">Agent: {bid.vendorId?.name}</p>
                    
                    <div className="mt-4 flex items-baseline justify-between border-t border-slate-200/60 pt-3">
                      <span className="text-xs text-slate-600 font-medium">Bid Amount:</span>
                      <span className={`text-lg font-black ${isCheapest ? 'text-teal-600' : 'text-slate-900'}`}>
                        ${bid.quotationAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Status Reference:</span>
                      <span className={`font-semibold ${bid.status === 'Approved' ? 'text-emerald-700' : bid.status === 'Rejected' ? 'text-red-700' : 'text-amber-700'}`}>{bid.status}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* --- SECTION B: MASTER TRANSACTION TRANSACTION REPOSITORY TABLE --- */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        
        {/* Sorting & Filtering Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold tracking-wider uppercase">
            <Filter className="h-4 w-4 text-teal-600" />
            Filter & Sort
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by scope title..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
              />
            </div>
            
            {/* Status Filter Dropdown */}
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Querying quotation history...</div>
        ) : filteredAndSortedQuotations.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No recorded procurement quotation transactions filed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Scope Title Requirements</th>
                  <th className="px-6 py-4">Assigned Vendor Vendor</th>
                  <th className="px-6 py-4">Ref Code & Amount</th>
                  <th className="px-6 py-4">Workflow Status</th>
                  <th className="px-6 py-4 text-center">Manage Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAndSortedQuotations.map((quote) => (
                  <tr key={quote._id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => setSelectedQuotation(quote)}>
                    <td className="px-6 py-4.5 max-w-xs">
                      <div className="font-bold text-slate-900 text-sm mb-0.5">{quote.title}</div>
                      <div className="text-xs text-slate-600 font-medium line-clamp-1">{quote.description}</div>
                    </td>
                    <td className="px-6 py-4.5 text-xs">
                      <div className="font-semibold text-slate-900">{quote.vendorId?.companyName || 'N/A'}</div>
                      <div className="text-slate-600">{quote.vendorId?.email || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4.5 text-xs">
                      <div className="text-slate-600 mb-0.5 font-mono">{quote.vendorReference}</div>
                      <div className="font-bold text-slate-900 text-sm">${quote.quotationAmount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4.5 text-xs">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold border ${
                        quote.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        quote.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${quote.status === 'Approved' ? 'bg-emerald-500' : quote.status === 'Rejected' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                        {quote.status}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuotation(quote);
                          }}
                          className="p-1.5 bg-teal-50 hover:bg-teal-100 text-teal-600 rounded border border-teal-200 transition-colors" 
                          title="View Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(quote._id, 'Approved');
                          }}
                          className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded border border-emerald-200 transition-colors" 
                          title="Approve Quotation Contract"
                        >
                          <Check className="h-3.5 w-3.5" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusUpdate(quote._id, 'Rejected');
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded border border-red-200 transition-colors" 
                          title="Reject Bid"
                        >
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

      {/* View Quotation Modal */}
      {selectedQuotation && (
        <ViewQuotationModal quotation={selectedQuotation} onClose={() => setSelectedQuotation(null)} />
      )}
    </div>
  );
}