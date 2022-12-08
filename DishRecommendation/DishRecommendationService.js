
const DishRecommendationDB = require('./DishRecommendationDB');

var FridgeUserService = {
    GetUsersByFridgeId: async function (fridgeId) {
        try {
            var food_names = await DishRecommendationDB.GetFoodNamesForFridge(fridgeId);
            let dish_names = await DishRecommendationDB.GetDishNamesAccordingToFoodNames(food_names);
            res.status(200).send(dish_names);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = FridgeUserService;
