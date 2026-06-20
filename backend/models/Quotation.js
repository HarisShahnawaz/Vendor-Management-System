const mongoose = require('mongoose');

const QuotationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  vendorReference: { type: String, required: true }, // Internal tracking code or reference
  quotationAmount: { type: Number, required: true },
  submissionDate: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected'], 
    default: 'Pending' 
  },
  // Link this quotation directly to a specific Vendor record
  vendorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Vendor', 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Quotation', QuotationSchema);