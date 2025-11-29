let UserModel = require('../models/user-model');

// CREATE
module.exports.create = async function (req, res, next) {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ – ALL
module.exports.list = async function (req, res, next) {
  try {
    const list = await UserModel.find();
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// READ – BY ID
module.exports.getById = async function (req, res, next) {
  try {
    const user = await UserModel.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
module.exports.update = async function (req, res, next) {
  try {
    const result = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (result) res.status(200).json({ success: true, message: 'User updated successfully.' });
    else throw new Error('User not found.');
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE – BY ID
module.exports.remove = async function (req, res, next) {
  try {
    const result = await UserModel.findByIdAndDelete(req.params.id);
    if (result) res.status(200).json({ success: true, message: 'User deleted successfully.' });
    else throw new Error('User not found.');
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE – ALL
module.exports.removeAll = async function (req, res, next) {
  try {
    const result = await UserModel.deleteMany({});
    res.json({ success: true, message: `Deleted ${result.deletedCount} user(s).` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
