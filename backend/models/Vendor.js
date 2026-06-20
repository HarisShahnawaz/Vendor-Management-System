const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  address: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Vendor', VendorSchema);