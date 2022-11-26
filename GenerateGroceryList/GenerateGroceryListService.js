const { response } = require('express');
const db = require('./GenerateGroceryListDB');

var DishNameSuggestionService = {
    separateIngredients: async function (fridge_id, ingredients, directions) {
        ingredients = ingredients.map((item) => item.trim().toLowerCase())
        var fridge_items = await db.isIngredientInFridgeList(fridge_id, ingredients);
        var grocery_list = ingredients.filter((item) => {
            return !fridge_items.includes(item)
        })
        return {
            "fridge": fridge_items,
            "grocery": grocery_list,
            "directions": directions
        }
    },
    generateGroceryList: async function (dishName, fridge_id) {
        try {
            var recipe = JSON.parse(JSON.stringify(await db.getIngredients(dishName)));
            var ingredients = recipe.ingredients.split(',');
            ingredients = ingredients.map((item) => item.replaceAll('\n', ''));
            return await this.separateIngredients(fridge_id, ingredients, recipe.type);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = DishNameSuggestionService;