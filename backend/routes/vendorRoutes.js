const express = require('express');
const router = express.Router();
const { addVendor, getVendors, updateVendor, deleteVendor } = require('../controllers/vendorController');

// Define CRUD routes for vendors
router.post('/', addVendor);
router.get('/', getVendors);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

module.exports = router;