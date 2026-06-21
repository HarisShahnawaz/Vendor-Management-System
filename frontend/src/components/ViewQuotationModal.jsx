import React from 'react';
import { X, FileText, DollarSign, Building2, Calendar, Hash, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function ViewQuotationModal({ quotation, onClose }) {
  if (!quotation) return null;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="h-5 w-5 text-emerald-400" />;
      case 'Rejected':
        return <XCircle className="h-5 w-5 text-red-400" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-amber-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-slate-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Rejected':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600 text-white">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{quotation.title}</h2>
              <p className="text-xs text-slate-500">Quotation Details</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Quotation Overview */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              <FileText className="h-4 w-4 text-teal-600" />
              Quotation Overview
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Title</label>
                <p className="mt-1 text-base font-semibold text-slate-900">{quotation.title}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Description</label>
                <p className="mt-1 text-sm text-slate-700 leading-relaxed">{quotation.description}</p>
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              <DollarSign className="h-4 w-4 text-teal-600" />
              Financial Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Quotation Amount</label>
                <p className="mt-1 text-2xl font-bold text-teal-600">
                  ${quotation.quotationAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Vendor Reference</label>
                <p className="mt-1 text-sm font-mono text-slate-700">{quotation.vendorReference}</p>
              </div>
            </div>
          </div>

          {/* Vendor Information */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              <Building2 className="h-4 w-4 text-teal-600" />
              Vendor Information
            </h3>
            {quotation.vendorId ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Company Name</label>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{quotation.vendorId.companyName}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Representative</label>
                  <p className="mt-1 text-sm text-slate-700">{quotation.vendorId.name}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Email</label>
                  <p className="mt-1 text-sm text-slate-700">{quotation.vendorId.email}</p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Contact Number</label>
                  <p className="mt-1 text-sm text-slate-700">{quotation.vendorId.contactNumber}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">Vendor information not available</p>
            )}
          </div>

          {/* Status & Timeline */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
              <Calendar className="h-4 w-4 text-teal-600" />
              Status & Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Current Status</label>
                <div className="mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border ${getStatusColor(quotation.status)}">
                  {getStatusIcon(quotation.status)}
                  {quotation.status}
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Quotation ID</label>
                <p className="mt-1 text-sm font-mono text-slate-700">{quotation._id}</p>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Created Date</label>
                <p className="mt-1 text-sm text-slate-700">
                  {quotation.createdAt ? new Date(quotation.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'N/A'}
                </p>
              </div>
              <div>
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Last Updated</label>
                <p className="mt-1 text-sm text-slate-700">
                  {quotation.updatedAt ? new Date(quotation.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4">
          <button 
            onClick={onClose}
            className="w-full rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 font-bold px-4 py-2.5 text-sm transition-colors"
          >
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
}
