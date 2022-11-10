const express = require('express');
const router = express.Router();
const DishRecommendationDB = require('./DishRecommendationDB');

router.get('/:fridge_id', async (req, res) => {
    try {
        let names = await DishRecommendationDB.GetFoodItemsInRecipe(req.params.fridge_id);
        res.status(200).send(names);
    } catch (error) {
        if (error.message === 'Dish not found') {
            res.status(404).send({message: error.message});
        } else {
            res.status(500).send(error.message);
        }
    }
});

module.exports = router;