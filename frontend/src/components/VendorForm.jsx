import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function VendorForm({ onClose, onVendorAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    contactNumber: '',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation Check
    if (!formData.name || !formData.companyName || !formData.email || !formData.contactNumber || !formData.address) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to submit form');

      onVendorAdded(data); // Refresh the parent table instantly
      onClose(); // Hide modal
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f] p-6 shadow-2xl animate-fade-in text-slate-900 dark:text-white">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
          <h3 className="text-md font-bold uppercase tracking-wider text-slate-900 dark:text-white">Onboard New Vendor</h3>
          <button onClick={onClose} className="text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 p-3 text-xs font-medium text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Input Matrix */}
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">Contact Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. John Doe" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#020c1b] px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">Company Entity Name</label>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Apex Logistics Ltd" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#020c1b] px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-colors" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">Corporate Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#020c1b] px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">Contact Number</label>
              <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="+92 300 1234567" className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#020c1b] px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-colors" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 mb-1.5">Business Address</label>
            <textarea name="address" rows="2" value={formData.address} onChange={handleChange} placeholder="Headquarters physical facility street coordinates..." className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#020c1b] px-3.5 py-2 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-teal-500 focus:outline-none transition-colors resize-none"></textarea>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 dark:border-slate-800 pt-4 mt-6">
            <button type="button" onClick={onClose} className="rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="rounded-lg bg-teal-600 border border-teal-600 px-5 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition-colors disabled:opacity-50">
              {loading ? 'Onboarding...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}