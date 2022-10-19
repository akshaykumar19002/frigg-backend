const express = require('express');
const router = express.Router();
const FridgeListServices = require('./FridgeListService');


router.get('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const groceryItems = await FridgeListServices.GetAllFridgeListByFridgeId(1);
        res.status(200).send(groceryItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const groceryItem = await FridgeListServices.AddGroceryItem(1, req.body.groceryItemId);
        res.status(200).send(groceryItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const response = await FridgeListServices.DeleteGroceryItem(1, req.params.id);
            res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/UpdateFridgeList', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        // TODO: pass 2nd argument according to groceryitems list
        const groceryItemList = req.body;
        const groceryUpdated = await FridgeListServices.UpdateFridgeListByGroceryItemslist(1, groceryItemList);
        if (groceryUpdated) {
            res.status(200).send({message: 'Fridge list updated successfully'});
        } else {
            res.status(500).send({message: 'Fridge list update failed'});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;