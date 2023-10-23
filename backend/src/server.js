const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // Use the specified port or default to 3000

// Load environment variables from .env file
require('dotenv').config();

// Import the Ethereum provider setup and contract ABI
const { web3, mainContract } = require('./web3'); // Modify the file path as needed
app.use(cors());
app.use(express.json());

// Define your API routes (e.g., cardRoutes)
const cardRoutes = require('../routes/cardRoutes');
app.use('/api/collections', cardRoutes);

// Set up a default route
app.get('/', (req, res) => {
    res.send('Welcome to the Collectible Card Game API!');
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
