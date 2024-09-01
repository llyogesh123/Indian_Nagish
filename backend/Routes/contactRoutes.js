// routes/contactRoutes.js
const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Add a new contact
router.post('/add-contact', async (req, res) => {
  const { name, phoneNumber, icon } = req.body;

  if (!name || !phoneNumber) {
    return res.status(400).json({ message: 'Name and phone number are required' });
  }

  try {
    const newContact = new Contact({ name, phoneNumber, icon });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add contact', error });
  }
});

router.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch contacts', error });
    }
  });

module.exports = router;