// server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (replace <username>, <password>, <dbname>)
mongoose.connect('mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB error:', err));

// Define schema and model
const FormEntry = mongoose.model('FormEntry', {
  name: String,
  email: String
});

// API route
app.post('/api/form', async (req, res) => {
  try {
    const entry = new FormEntry(req.body);
    await entry.save();
    res.json({ message: 'Form data saved!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
