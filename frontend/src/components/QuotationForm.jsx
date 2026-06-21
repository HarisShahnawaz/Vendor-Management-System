import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function QuotationForm({ onClose, onQuotationAdded }) {
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    vendorReference: '',
    quotationAmount: '',
    vendorId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch available vendors to build out the select reference dropdown
    fetch('http://localhost:5000/api/vendors')
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.vendorReference || !formData.quotationAmount || !formData.vendorId) {
      setError('Please provide all procurement criteria parameters.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to file submission');

      onQuotationAdded();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-2xl text-slate-900">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <h3 className="text-md font-bold uppercase tracking-wider text-slate-900">Log Vendor Quotation</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-xs text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Procurement Title / Requirement Scope</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Office Server Hardware Procurement" className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Description Specs</label>
            <textarea name="description" rows="2" value={formData.description} onChange={handleChange} placeholder="Detail specifications, scope matrix bounds, or logistics conditions..." className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none resize-none"></textarea>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Select Vendor Entity</label>
            <select name="vendorId" value={formData.vendorId} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-slate-900 focus:border-teal-500 focus:outline-none">
              <option value="">-- Choose onboarded supplier --</option>
              {vendors.map((v) => (
                <option key={v._id} value={v._id} className="bg-white">
                  {v.companyName} (Rep: {v.name})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Internal Ref Code</label>
              <input type="text" name="vendorReference" value={formData.vendorReference} onChange={handleChange} placeholder="REF-XXXX" className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Quotation Amount ($)</label>
              <input type="number" name="quotationAmount" value={formData.quotationAmount} onChange={handleChange} placeholder="0.00" className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-slate-900 placeholder-slate-400 focus:border-teal-500 focus:outline-none" />
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4 mt-6">
            <button type="button" onClick={onClose} className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold hover:bg-slate-200 text-slate-700">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="rounded-lg bg-teal-600 border border-teal-600 px-5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm">
              {loading ? 'Submitting Bid...' : 'File Quotation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}