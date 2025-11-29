const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect(process.env.ATLASDB);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('====> Connected to MongoDB (Portfolio).');
  });

  return db;
};

