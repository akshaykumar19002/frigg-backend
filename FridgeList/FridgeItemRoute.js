const express = require('express');
const router = express.Router();
const FridgeListService = require('./FridgeListService');

router.get('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const fridgeItems = await FridgeListService.GetAllFridgeListByFridgeId(1);
        res.status(200).send(fridgeItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const fridgeItem = await FridgeListService.AddFridgeItem(1, req.body.fridgeItemId);
        res.status(200).send(fridgeItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const fridgeItem = await FridgeListService.DeleteFridgeItem(1, req.params.id);
        // TODO: Give appropriate message in response if all items are deleted
        res.status(200).send(fridgeItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;