const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    email:     { type: String, required: true, unique: true, trim: true },
    password:  { type: String, required: true },
    created:   { type: Date, default: Date.now },
    updated:   { type: Date, default: Date.now }
  },
  { collection: 'users' }
);

module.exports = mongoose.model('Users', UsersSchema);
