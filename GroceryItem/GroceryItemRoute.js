const express = require('express');
const router = express.Router();
const GroceryItemService = require('./GroceryItemService');

router.get('/', async (req, res) => {
    try {
        const groceryItems = await GroceryItemService.GetAllGroceryItems();
        res.status(200).send(groceryItems);
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

router.delete('/:id', async (req, res) => {
    try {
        await GroceryItemService.RemoveGroceryItem(req.params.id);
        res.status(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const groceryItem = await GroceryItemService.GetGroceryItemById(req.params.id);
        res.status(200).send(groceryItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;