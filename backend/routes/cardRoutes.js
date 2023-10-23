const express = require('express');
const router = express.Router();

// Import the Ethereum provider and Main contract from your web3.js file
const { web3, mainContract } = require('../src/web3'); // Adjust the file path as needed

// Define a route to get card information by cardId
router.get('/collections', async (req, res) => {
    try {
        // const cardId = req.params.cardId;

        // Use the Ethereum provider to call a function on the Main contract to get card information
        const collectionInfo = await mainContract.methods.getAllCollectionsAndCards().call();

        // Format the card information into a JSON response
        // const response = collectionInfo.map((collection) => {
        //     return {
        //         collectionName: collection[0],
        //         cardCount: collection[1],
        //         cards: collection[2].map((card) => {
        //             return {
        //                 img: card[0],
        //                 cardNumber: card[1],
        //             };
        //         }),
        //     };
        // });
        //
        // res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add more routes and logic as needed

module.exports = router;
