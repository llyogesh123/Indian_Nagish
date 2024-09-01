const express = require('express');
const PhoneNumber = require('../models/PhoneNumber');

const router = express.Router();

// Example route to get all phone numbers
router.get('/phone-numbers', async (req, res) => {
  try {
    const phoneNumbers = await PhoneNumber.find();
    res.json(phoneNumbers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching phone numbers', error });
  }
});

// Example route to add a new phone number
router.post('/phone-numbers', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    // Check if the phone number already exists
    let existingPhoneNumber = await PhoneNumber.findOne({ phoneNumber });
    if (existingPhoneNumber) {
      return res.status(400).json({ message: 'Phone number already exists' });
    }

    // Save the new phone number
    const newPhoneNumber = new PhoneNumber({ phoneNumber });
    await newPhoneNumber.save();

    res.status(201).json({ message: 'Phone number added', phoneNumber: newPhoneNumber });
  } catch (error) {
    res.status(500).json({ message: 'Error adding phone number', error });
  }
});

// Example route to delete a phone number
router.delete('/phone-numbers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await PhoneNumber.findByIdAndDelete(id);
    res.json({ message: 'Phone number deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting phone number', error });
  }
});

module.exports = router;