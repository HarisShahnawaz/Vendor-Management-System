import React, { useState, useEffect } from 'react';
import { Plus, Search, Trash2, Mail, Phone, MapPin, Eye, Edit } from 'lucide-react';
import VendorForm from './VendorForm';
import ViewVendorModal from './ViewVendorModal';

export default function VendorsList() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorToEdit, setVendorToEdit] = useState(null);

  // Fetch all vendor profiles
  const fetchVendors = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/vendors');
      const data = await res.json();
      if (res.ok) setVendors(data);
    } catch (err) {
      console.error("Error connecting frontend pipeline:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // Real-time filter logic
  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleVendorUpdated = (updatedVendor) => {
    setVendors(vendors.map(v => v._id === updatedVendor._id ? updatedVendor : v));
  };

  const handleEdit = (vendor) => {
    setVendorToEdit(vendor);
    setShowForm(true);
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-900 dark:text-white">
      
      {/* Control Top Header Panel Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input type="text" placeholder="Search by name or company..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#020c1b] pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:outline-none transition-colors" />
        </div>

        {/* Create Profile Trigger Button */}
        <button onClick={() => setShowForm(true)} className="flex items-center justify-center gap-2 rounded-lg bg-teal-600 border border-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-700 shadow-sm transition-all duration-200 active:scale-95 transition-transform">
          <Plus className="h-4 w-4" /> Add Vendor Profile
        </button>
      </div>

      {/* Main Data Repository Matrix Grid Table Grid Container Container */}
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f]/40 shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">Querying active records stream database...</div>
        ) : filteredVendors.length === 0 ? (
          <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">No synchronized vendor records found matching conditions.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-[#0a192f]/60 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  <th className="px-6 py-4">Vendor & Company</th>
                  <th className="px-6 py-4">Contact Gateway</th>
                  <th className="px-6 py-4">Physical Location</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700 bg-transparent">
                {filteredVendors.map((vendor) => (
                  <tr key={vendor._id} className="hover:bg-slate-50 dark:hover:bg-[#0a192f]/60 transition-colors group cursor-pointer" onClick={() => setSelectedVendor(vendor)}>
                    <td className="px-6 py-4.5">
                      <div className="font-semibold text-slate-900 dark:text-white text-base mb-0.5">{vendor.companyName}</div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 font-medium tracking-wide">Rep: {vendor.name}</div>
                    </td>
                    <td className="px-6 py-4.5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-teal-600/70" /> {vendor.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-teal-600/70" /> {vendor.contactNumber}
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-xs text-slate-600 dark:text-slate-400">
                      <div className="flex items-start gap-1.5 max-w-xs">
                        <MapPin className="h-4 w-4 text-slate-400 dark:text-slate-500 mt-0.5 shrink-0" />
                        <span>{vendor.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4.5 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedVendor(vendor);
                          }}
                          className="p-2 text-slate-500 dark:text-slate-400 hover:text-teal-600 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-all duration-200" 
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(vendor);
                          }}
                          className="p-2 text-slate-500 dark:text-slate-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-all duration-200" 
                          title="Edit Profile"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(vendor._id);
                          }}
                          className="p-2 text-slate-500 dark:text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-200" 
                          title="Delete Profile"
                        >
                          <Trash2 className="h-4 w-4" />
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

      {/* Conditional Form Modal Portal Shell Insertion Render */}
      {showForm && (
        <VendorForm 
          onClose={() => {
            setShowForm(false);
            setVendorToEdit(null);
          }} 
          onVendorAdded={handleVendorAdded}
          vendorToEdit={vendorToEdit}
          onVendorUpdated={handleVendorUpdated}
        />
      )}

      {/* View Vendor Modal */}
      {selectedVendor && (
        <ViewVendorModal vendor={selectedVendor} onClose={() => setSelectedVendor(null)} />
      )}
    </div>
  );
}