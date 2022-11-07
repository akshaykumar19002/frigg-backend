const express = require('express');
const router = express.Router();
const GroceryListService = require('./GroceryListService');


router.get('/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItems = await GroceryListService.GetAllGroceryListByFridgeId(req.params.fridge_id);
        res.status(200).send(foodItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItem = await GroceryListService.AddFoodItem(req.params.fridge_id, req.body.food_item_id, req.body.quantity);
        res.status(200).send(foodItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.post('/AddFoodItemByName/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItem = await GroceryListService.AddFoodItemByName(req.params.fridge_id, req.body.food_item_name, req.body.quantity);
        res.status(200).send(foodItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.delete('/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const response = await GroceryListService.DeleteFoodItem(req.params.fridge_id, req.body.id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/UpdateGroceryList/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        // TODO: pass 2nd argument according to fooditems list
        const foodItemList = req.body;
        const groceryUpdated = await GroceryListService.UpdateGroceryListByFoodItemslist(req.params.fridge_id, foodItemList);
        if (groceryUpdated) {
            res.status(200).send({message: 'Grocery list updated successfully'});
        } else {
            res.status(500).send({message: 'Grocery list update failed'});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/AddGroceryList/:fridge_id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        // TODO: pass 2nd argument according to fooditems list
        const foodItemList = req.body;
        const groceryUpdated = await GroceryListService.AddGroceryListByFoodItemsList(req.params.fridge_id, foodItemList);
        if (groceryUpdated) {
            res.status(200).send({message: 'Grocery list updated successfully'});
        } else {
            res.status(500).send({message: 'Grocery list update failed'});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;