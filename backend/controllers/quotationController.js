const Quotation = require('../models/Quotation');

// 1. Create a quotation request and assign to a vendor
const createQuotation = async (req, res) => {
  try {
    const { title, description, vendorReference, quotationAmount, status, vendorId } = req.body;
    
    const newQuotation = new Quotation({
      title,
      description,
      vendorReference,
      quotationAmount,
      status,
      vendorId
    });

    await newQuotation.save();
    res.status(201).json(newQuotation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating quotation reference', error: error.message });
  }
};

// 2. View all quotations (with full Vendor profiles populated)
const getQuotationHistory = async (req, res) => {
  try {
    const quotations = await Quotation.find()
      .populate('vendorId', 'name companyName email') // Merges data fields from our Vendor collection
      .sort({ createdAt: -1 });
    res.status(200).json(quotations);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving system entries', error: error.message });
  }
};

// 3. Update quotation status (e.g., Pending -> Approved or Rejected)
const updateQuotationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedQuotation = await Quotation.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true, runValidators: true }
    );

    if (!updatedQuotation) {
      return res.status(404).json({ message: 'Quotation not found' });
    }
    res.status(200).json(updatedQuotation);
  } catch (error) {
    res.status(500).json({ message: 'Error modifying record status', error: error.message });
  }
};

// 4. Compare Quotations side-by-side and highlight the lowest bid
const compareQuotations = async (req, res) => {
  try {
    const { title } = req.query; // Group items by matching titles/requirements
    
    if (!title) {
      return res.status(400).json({ message: 'Provide a proposal title parameter to compare records.' });
    }

    // Find all active options matching the title
    const proposals = await Quotation.find({ title })
      .populate('vendorId', 'name companyName contactNumber');

    if (proposals.length === 0) {
      return res.status(404).json({ message: 'No bids found for this title scope.' });
    }

    // Identify the lowest bidder systematically
    const mostCostEffective = proposals.reduce((min, p) => 
      p.quotationAmount < min.quotationAmount ? p : min, proposals[0]
    );

    res.status(200).json({
      summaryList: proposals,
      cheapestOptionId: mostCostEffective._id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating metrics comparison matrix', error: error.message });
  }
};

module.exports = {
  createQuotation,
  getQuotationHistory,
  updateQuotationStatus,
  compareQuotations
};