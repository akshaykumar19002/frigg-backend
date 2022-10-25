const express = require('express');
const router = express.Router();
const FridgeListServices = require('./FridgeListService');


router.get('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItems = await FridgeListServices.GetAllFridgeListByFridgeId(1);
        res.status(200).send(foodItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItem = await FridgeListServices.AddFoodItem(1, req.body.foodItemId, req.body.quantity, req.body.purchaseDate, req.body.expectedExpiryDate);
        res.status(200).send(foodItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const response = await FridgeListServices.DeleteFoodItem(1, req.params.id);
            res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/UpdateFridgeList', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        // TODO: pass 2nd argument according to fooditems list
        const foodItemList = req.body;
        const groceryUpdated = await FridgeListServices.UpdateFridgeListByFoodItemslist(1, foodItemList);
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