const express = require('express');
const router = express.Router();
const FridgeListServices = require('./FridgeListService');


router.get('/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItems = await FridgeListServices.GetAllFridgeListByFridgeId(req.params.fridge_id);
        res.status(200).send(foodItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItem = await FridgeListServices.AddFoodItem(req.params.fridge_id, req.body.food_item_id, req.body.quantity, req.body.purchase_date, req.body.expected_expiry_date);
        res.status(200).send(foodItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post('/AddFoodItemByName/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItem = await FridgeListServices.AddFoodItemByName(req.params.fridge_id, req.body.food_item_name, req.body.quantity, req.body.purchase_date, req.body.expected_expiry_date);
        res.status(200).send(foodItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});
router.delete('/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const response = await FridgeListServices.DeleteFoodItem(req.params.fridge_id, req.body.food_item_id);
            res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/UpdateFridgeList/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        // TODO: pass 2nd argument according to fooditems list
        const foodItemList = req.body;
        const groceryUpdated = await FridgeListServices.UpdateFridgeListByFoodItemslist(req.params.fridge_id, foodItemList);
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