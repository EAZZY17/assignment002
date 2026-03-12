const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

module.exports = function () {
  const uri = process.env.ATLASDB;
  if (!uri) {
    console.error('ATLASDB environment variable is not set.');
    return mongoose.connection;
  }

  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
  });
  db.once('open', () => {
    console.log('====> Connected to MongoDB (Portfolio).');
  });

  mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
  }).catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    console.error('Tip: If you see "querySrv ENOTFOUND", use the standard connection string (mongodb://) instead of mongodb+srv:// in Render.');
  });

  return db;
};

