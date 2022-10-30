const { response } = require('express');
const db = require('./GenerateGroceryListDB');

var DishNameSuggestionService = {
    separateIngredients: async function (fridge_id, ingredients) {
        fridge_items = await db.isIngredientInFridgeList(fridge_id, ingredients);
        grocery_list = ingredients.filter((item) => {
            return !fridge_items.includes(item)
        })

        return {
            "fridge": fridge_items,
            "grocery": grocery_list
        }
        // ingredients = ingredients.map( async (item) => {
        //     var fridge_list_item = await db.isIngredientInFridgeList(fridge_id, item);
        //     if (fridge_list_item != undefined && fridge_list_item.id != undefined) {
        //         return item + ":F";
        //     } else {
        //         return item + ":G";
        //     }
        // })
        // return ingredients
    },
    generateGroceryList: async function (dishName, fridge_id) {
        try {
            var ingredients = JSON.parse(JSON.stringify(await db.getIngredients(dishName))).ingredients.split(',');
            ingredients = ingredients.map((item) => item.replaceAll('\n', ''));
            return await this.separateIngredients(fridge_id, ingredients);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = DishNameSuggestionService;