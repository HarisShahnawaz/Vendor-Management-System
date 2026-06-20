const Vendor = require('../models/Vendor');
const Quotation = require('../models/Quotation');

const getDashboardStats = async (req, res) => {
  try {
    // 1. Run parallel count queries for efficiency
    const totalVendors = await Vendor.countDocuments();
    
    const pendingQuotations = await Quotation.countDocuments({ status: 'Pending' });
    const approvedQuotations = await Quotation.countDocuments({ status: 'Approved' });
    
    // Active quotes are defined as either Pending or Approved (Not Rejected)
    const activeQuotations = await Quotation.countDocuments({ status: { $ne: 'Rejected' } });

    // 2. Fetch the 5 most recently created quotations as recent activity feed
    const recentActivities = await Quotation.find()
      .populate('vendorId', 'companyName')
      .sort({ createdAt: -1 })
      .limit(5);

    // 3. Format the recent activity log for the UI timeline
    const formattedActivities = recentActivities.map(activity => ({
      id: activity._id,
      text: `Quotation "${activity.title}" submitted by ${activity.vendorId?.companyName || 'Unknown Vendor'}`,
      amount: activity.quotationAmount,
      status: activity.status,
      time: activity.createdAt
    }));

    res.status(200).json({
      totalVendors,
      activeQuotations,
      pendingQuotations,
      approvedQuotations,
      recentActivities: formattedActivities
    });
  } catch (error) {
    res.status(500).json({ message: 'Error compiling dashboard metrics', error: error.message });
  }
};

module.exports = { getDashboardStats };