import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import VendorForm from './VendorForm';

export default function VendorsList() {
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch profiles based on search parameters
  const fetchVendors = async (query = '') => {
    try {
      const res = await fetch(`http://localhost:5000/api/vendors?search=${query}`);
      const data = await res.json();
      if (res.ok) setVendors(data);
    } catch (err) {
      console.error("Error connecting frontend pipeline:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVendors(search);
    }, 300); // 300ms debounce loop to avoid flooding backend server calls while typing

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this vendor profile permanently?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/vendors/${id}`, { method: 'DELETE' });
      if (res.ok) setVendors(vendors.filter(v => v._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleVendorAdded = (newVendor) => {
    setVendors([newVendor, ...vendors]);
  };

  return (
    <div className="space-y-6 animate-fade-in text-[#f5f5dc]">
      
      {/* Control Top Header Panel Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
          <input type="text" placeholder="Search by name or company..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-lg border border-[#1e2d42] bg-[#0a192f]/60 pl-9 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:border-[#14b8a6] focus:outline-none transition-colors" />
        </div>

        {/* Create Profile Trigger Button */}
        <button onClick={() => setShowForm(true)} className="flex items-center justify-center gap-2 rounded-lg bg-[#0f766e] border border-[#14b8a6]/40 px-4 py-2 text-xs font-bold text-white hover:bg-[#115e59] shadow-md shadow-[#0f766e]/10 transition-all duration-200">
          <Plus className="h-4 w-4" /> Add Vendor Profile
        </button>
      </div>

      {/* Main Data Repository Matrix Grid Table Grid Container Container */}
      <div className="overflow-hidden rounded-xl border border-[#1e2d42] bg-[#0a192f]/20 backdrop-blur-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-sm">Querying active records stream database...</div>
        ) : vendors.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">No synchronized vendor records found matching conditions.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#1e2d42] bg-[#0a192f]/60 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="px-6 py-4">Vendor & Company</th>
                  <th className="px-6 py-4">Contact Gateway</th>
                  <th className="px-6 py-4">Physical Location</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2d42] bg-transparent">
                {vendors.map((vendor) => (
                  <tr key={vendor._id} className="hover:bg-[#172a45]/30 transition-colors group">
                    <td className="px-6 py-4.5">
                      <div className="font-semibold text-white text-base mb-0.5">{vendor.companyName}</div>
                      <div className="text-xs text-slate-400 font-medium tracking-wide">Rep: {vendor.name}</div>
                    </td>
                    <td className="px-6 py-4.5 space-y-1 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-[#14b8a6]/70" /> {vendor.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-[#14b8a6]/70" /> {vendor.contactNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-xs text-slate-300">
                      <div className="flex items-start gap-1.5 max-w-xs">
                        <MapPin className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                        <span>{vendor.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      <button onClick={() => handleDelete(vendor._id)} className="p-2 text-slate-500 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200" title="Delete Profile">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Conditional Form Modal Portal Shell Insertion Render */}
      {showForm && (
        <VendorForm onClose={() => setShowForm(false)} onVendorAdded={handleVendorAdded} />
      )}
    </div>
  );
}