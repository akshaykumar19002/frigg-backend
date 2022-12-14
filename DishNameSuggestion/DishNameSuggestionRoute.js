const express = require('express');
const router = express.Router();
const service = require('./DishNameSuggestionService');

router.get('/:name', async (req, res) => {
    try {
        const foodItem = await service.search(req.params.name);
        res.status(200).send(foodItem);
    } catch (error) {
        if (error.message === 'Food Item not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

router.get('/', async (req, res) => {
    try {
        const foodItem = await service.fetchAllDishes();
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