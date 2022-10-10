const express = require('express');
const router = express.Router();
const GroceryListService = require('./GroceryListService');

router.get('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const groceryItems = await GroceryListService.GetAllGroceryListByFridgeId(1);
        res.status(200).send(groceryItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const groceryItem = await GroceryListService.AddGroceryItem(1, req.body.groceryItemId);
        res.status(200).send(groceryItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const groceryItem = await GroceryListService.DeleteGroceryItem(1, req.params.id);
        // TODO: Give appropriate message in response if all items are deleted
        res.status(200).send(groceryItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;