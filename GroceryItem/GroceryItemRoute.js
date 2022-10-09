const express = require('express');
const router = express.Router();
const GroceryItemService = require('./GroceryItemService');

router.get('/', async (req, res) => {
    try {
        res.send("hello from grocery route");
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.post('/', async (req, res) => {
    try {
        const groceryItem = await GroceryItemService.AddGroceryItem(req.body.name);
        res.status(200).send(groceryItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;