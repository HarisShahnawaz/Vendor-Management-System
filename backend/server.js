const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const vendorRoutes = require('./routes/vendorRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
dotenv.config();

const app = express();

// 1. Global Middleware (Must come FIRST)
app.use(cors());
app.use(express.json()); // Parses json data before it reaches your routes!

// 2. API Routes (Must come AFTER parsing middleware)
app.use('/api/vendors', vendorRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/dashboard', dashboardRoutes);
// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ Database Connection Error:', err));

// Base Route
app.get('/', (req, res) => {
  res.send('Vendor Management API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server spinning on port ${PORT}`);
});