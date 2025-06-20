const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 8080;

app.use(express.json());

// Load data once at startup
const hotels = JSON.parse(fs.readFileSync('./data/hotels.json'));
const rentalCars = JSON.parse(fs.readFileSync('./data/rental_cars.json'));
const searchResults = [...hotels, ...rentalCars];

// Search endpoint
app.post('/search', (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const results = searchResults.filter(
    item => item.city.toLowerCase() === city.toLowerCase()
  );

  res.json(results);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Hoen Search Microservice running on http://localhost:${PORT}`);
});
