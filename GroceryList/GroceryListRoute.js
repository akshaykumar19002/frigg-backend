const express = require('express');
const router = express.Router();
const GroceryListService = require('./GroceryListService');


router.get('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItems = await GroceryListService.GetAllGroceryListByFridgeId(1);
        res.status(200).send(foodItems);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItem = await GroceryListService.AddFoodItem(1, req.body.food_item_id, req.body.quantity);
        res.status(200).send(foodItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.post('/AddFoodItemByName', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const foodItem = await GroceryListService.AddFoodItemByName(1, req.body.food_item_name, req.body.quantity);
        res.status(200).send(foodItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        const response = await GroceryListService.DeleteFoodItem(1, req.params.id);
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/UpdateGroceryList', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        // TODO: pass 2nd argument according to fooditems list
        const foodItemList = req.body;
        const groceryUpdated = await GroceryListService.UpdateGroceryListByFoodItemslist(1, foodItemList);
        if (groceryUpdated) {
            res.status(200).send({message: 'Grocery list updated successfully'});
        } else {
            res.status(500).send({message: 'Grocery list update failed'});
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/AddGroceryList', async (req, res) => {
    try {
        // TODO: change hardcoded fridge id with dynamic value
        // TODO: pass 2nd argument according to fooditems list
        const foodItemList = req.body;
        const groceryUpdated = await GroceryListService.AddGroceryListByFoodItemsList(1, foodItemList);
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