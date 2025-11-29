// app/controllers/contacts.js
const ContactModel = require('../models/contact-model');

// CREATE
module.exports.create = async function (req, res, next) {
  try {
    const newContact = await ContactModel.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// LIST ALL
module.exports.list = async function (req, res, next) {
  try {
    const list = await ContactModel.find();
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
module.exports.getById = async function (req, res, next) {
  try {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, message: 'Not found' });
    res.json(contact);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// UPDATE
module.exports.update = async function (req, res, next) {
  try {
    const updated = await ContactModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (updated) {
      return res.json(updated);
    }
    throw new Error('Contact not updated. Are you sure it exists?');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// DELETE
module.exports.remove = async function (req, res, next) {
  try {
    const result = await ContactModel.deleteOne({ _id: req.params.id });
    if (result.deletedCount > 0) {
      return res.json({ success: true, message: 'Contact deleted successfully.' });
    }
    throw new Error('Contact not deleted. Are you sure it exists?');
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// DELETE ALL
module.exports.removeAll = async function (req, res, next) {
  try {
    const result = await ContactModel.deleteMany({});
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} contact(s).`
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
