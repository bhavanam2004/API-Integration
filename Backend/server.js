require('dotenv').config(); // Load environment variables

console.log("✅ MONGO_URI:", process.env.MONGO_URI || "❌ Not found");
console.log("✅ WEATHER_API_KEY:", process.env.WEATHER_API_KEY || "❌ Not found");
require('dotenv').config({ path: './.env' }); // Explicitly specify the path


const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db'); 
const Weather = require('./models/Weather'); 

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Weather API Route
app.get('/weather/:city', async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY;

  // Debug: Log API Key before making a request
  console.log("🔍 Using API Key:", apiKey);

  if (!apiKey) {
    return res.status(500).json({ error: "❌ API Key is missing! Check your .env file" });
  }
  

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    console.error("❌ API Error:", error.response ? error.response.data : error.message);
    res.status(400).json({ error: error.response?.data?.message || "City not found" });
  }
});
app.use(cors({
  origin: '*',  // Allows all origins (For testing)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


const PORT = process.env.PORT || 5011;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
