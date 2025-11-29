const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactsSchema = new Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName:  { type: String, trim: true, required: true },
    email:     {
      type: String,
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid e-mail address'],
      required: true
    },
    phone:     { type: String, trim: true },
    message:   { type: String, trim: true }
  },
  { collection: 'contacts' }
);

module.exports = mongoose.model('Contacts', ContactsSchema);
