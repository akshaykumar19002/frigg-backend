const express = require('express');
const router = express.Router();
const GroceryItemService = require('./GroceryItemService');

router.get('/', async (req, res) => {
    try {
        const groceryItems = await GroceryItemService.GetAllGroceryItems();
        if (groceryItems.length === 0) {
            res.status(200).send({message: 'No Grocery items'});
        } else {
            res.status(200).send(groceryItems);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// TODO: add code to upload image to s3.
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
        const groceryItem = await GroceryItemService.RemoveGroceryItem(req.params.id);
        res.status(200).send({ message: 'Grocery Item deleted' });
    } catch (error) {
        if (error.message === 'Grocery Item not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const groceryItem = await GroceryItemService.GetGroceryItemById(req.params.id);
        res.status(200).send(groceryItem);
    } catch (error) {
        if (error.message === 'Grocery Item not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

module.exports = router;