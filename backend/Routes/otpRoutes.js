const express = require('express');
const Otp = require('../models/Otp'); // Adjusted path
const PhoneNumber = require('../models/PhoneNumber'); // Adjusted path

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ message: 'Phone number is required' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`OTP sent to ${phoneNumber}: ${otp}`);

  // Save phone number to the database if it doesn't exist
  let phoneRecord = await PhoneNumber.findOne({ phoneNumber });
  if (!phoneRecord) {
    phoneRecord = new PhoneNumber({ phoneNumber });
    await phoneRecord.save();
  }

  // Save OTP to the database
  const newOtp = new Otp({ phoneNumber, otp });
  await newOtp.save();

  res.json({ message: 'OTP sent', otp });
});

router.post('/verify-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ message: 'Phone number and OTP are required' });
  }

  // Find the OTP in the database
  const otpRecord = await Otp.findOne({ phoneNumber, otp });

  if (otpRecord) {
    res.json({ message: 'OTP verified' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
});

module.exports = router;