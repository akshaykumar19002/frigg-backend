const {sequelize, Op} = require('sequelize');
const db = require('../Config/db');

async function getIngredients(dishName) {
    try {
        var ingredients = await db.recipe_lists.findOne({
            attributes: ['ingredients', 'type'],
            where: {
                recipe_name: dishName.toLowerCase()
            }
        });
        return ingredients;
    } catch (error) {
        console.log(error);
    }
}

async function isIngredientInFridgeList(fridgeId, foodItems) {
    try {
        var foodItemIds = await db.food_item.findAll({
            attributes: ['id'],
            where: {
                name: {
                    [Op.in]: foodItems
                }
            }
        })
        foodItemIds = foodItemIds.map((item) => item.id);
        var fridgeItemIds = await db.fridge_list.findAll({
            attributes: ['food_item_id'],
            where: {
                fridge_id: fridgeId,
                food_item_id: {
                    [Op.in]: foodItemIds
                }
            }
        });
        fridgeItemIds = fridgeItemIds.map((item) => item.food_item_id)
        var foodItems = await db.food_item.findAll({
            attributes: ['name'],
            where: {
                id: {
                    [Op.in]: fridgeItemIds
                }
            }
        })
        foodItems = foodItems.map((item) => item.name)
        return foodItems;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getIngredients,
    isIngredientInFridgeList
}