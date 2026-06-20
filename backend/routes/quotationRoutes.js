const express = require('express');
const router = express.Router();
const { 
  createQuotation, 
  getQuotationHistory, 
  updateQuotationStatus, 
  compareQuotations 
} = require('../controllers/quotationController');

router.post('/', createQuotation);
router.get('/', getQuotationHistory);
router.get('/compare', compareQuotations);
router.put('/:id/status', updateQuotationStatus);

module.exports = router;