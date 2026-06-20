const Vendor = require('../models/Vendor');

// 1. Add a new vendor
const addVendor = async (req, res) => {
  try {
    const { name, companyName, email, contactNumber, address } = req.body;
    
    // Check if vendor already exists
    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: 'A vendor with this email already exists.' });
    }

    const newVendor = new Vendor({ name, companyName, email, contactNumber, address });
    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).json({ message: 'Server Error matching request', error: error.message });
  }
};

// 2. Get all vendors (with Search and Filter)
const getVendors = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    // If search term exists, filter by Name or Company Name
    if (search) {
      query = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { companyName: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const vendors = await Vendor.find(query).sort({ createdAt: -1 });
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching data', error: error.message });
  }
};

// 3. Update a vendor's details
const updateVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVendor = await Vendor.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    
    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json(updatedVendor);
  } catch (error) {
    res.status(500).json({ message: 'Server Error updating data', error: error.message });
  }
};

// 4. Delete a vendor
const deleteVendor = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVendor = await Vendor.findByIdAndDelete(id);
    
    if (!deletedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error removing record', error: error.message });
  }
};

module.exports = {
  addVendor,
  getVendors,
  updateVendor,
  deleteVendor
};