require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const aiRoutes = require('./routes/ai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.get('/api/health', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// AI Routes
app.use('/api/ai', aiRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
