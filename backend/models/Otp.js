const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String },
  createdAt: { type: Date, default: Date.now, expires: '5m' }, // OTP expires in 5 minutes
});

const Otp = mongoose.model('Otp', otpSchema);

module.exports = Otp;