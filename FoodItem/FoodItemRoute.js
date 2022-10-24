const express = require('express');
const router = express.Router();
const FoodItemService = require('./FoodItemService');

router.get('/', async (req, res) => {
    try {
        const foodItems = await FoodItemService.GetAllFoodItems();
        if (foodItems.length === 0) {
            res.status(200).send({message: 'No Food items'});
        } else {
            res.status(200).send(foodItems);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// TODO: add code to upload image to s3.
router.post('/', async (req, res) => {
    try {
        const foodItem = await FoodItemService.AddFoodItem(req.body.name, req.body.expected_expiry_days);
        res.status(200).send(foodItem);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const foodItem = await FoodItemService.RemoveFoodItem(req.params.id);
        res.status(200).send({ message: 'Food Item deleted' });
    } catch (error) {
        if (error.message === 'Food Item not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

router.get('/:id', async (req, res) => {
    try {
        const foodItem = await FoodItemService.GetFoodItemById(req.params.id);
        res.status(200).send(foodItem);
    } catch (error) {
        if (error.message === 'Food Item not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

router.get('/search/:name', async (req, res) => {
    try {
        const foodItem = await FoodItemService.GetFoodItemByPartialName(req.params.name);
        res.status(200).send(foodItem);
    } catch (error) {
        if (error.message === 'Food Item not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

module.exports = router;