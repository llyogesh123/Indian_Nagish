const mongoose = require('mongoose');

const phoneNumberSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const PhoneNumber = mongoose.model('PhoneNumber', phoneNumberSchema);

module.exports = PhoneNumber;