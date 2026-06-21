import React from 'react';
import { X, Mail, Phone, MapPin, Building2, Calendar, User, FileText } from 'lucide-react';

export default function ViewVendorModal({ vendor, onClose }) {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a192f] shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0a192f]/95 backdrop-blur-md px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">{vendor.companyName}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Vendor Profile Details</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Company Information */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a192f]/40 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              <Building2 className="h-4 w-4 text-teal-600" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Company Name</label>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{vendor.companyName}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Representative</label>
                <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">{vendor.name}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a192f]/40 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              <Mail className="h-4 w-4 text-teal-600" />
              Contact Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-teal-600/70 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Email Address</label>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{vendor.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-teal-600/70 mt-0.5 shrink-0" />
                <div className="flex-1">
                  <label className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Contact Number</label>
                  <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{vendor.contactNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a192f]/40 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              <MapPin className="h-4 w-4 text-teal-600" />
              Physical Location
            </h3>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-teal-600/70 mt-0.5 shrink-0" />
              <div className="flex-1">
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Full Address</label>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{vendor.address}</p>
              </div>
            </div>
          </div>

          {/* Registration Information */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a192f]/40 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              <Calendar className="h-4 w-4 text-teal-600" />
              Registration Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Profile ID</label>
                <p className="mt-1 text-sm font-mono text-slate-700 dark:text-slate-300">{vendor._id}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Registration Date</label>
                <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                  {vendor.createdAt ? new Date(vendor.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0a192f]/95 backdrop-blur-md px-6 py-4">
          <button 
            onClick={onClose}
            className="w-full rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 font-bold px-4 py-2.5 text-sm transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
