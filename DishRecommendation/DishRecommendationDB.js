const db = require('../Config/db');
const sequelize = require('sequelize');

async function GetFoodItemsInRecipe(fridgeId) {
    try {
        const fridgeList = await db.fridge_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            include: [{
                model: db.food_item,
                attributes: ['name']
            }],
            order: [
                ['expected_expiry_date', 'ASC']
            ]
        }); 

        let recipeList = [];
        for (let i = 0; i < fridgeList.length; i++) {
            const recipe = await db.recipe_lists.findAll({
                where: {
                    ingredients: {
                        [sequelize.Op.like]: '%' + fridgeList[i].food_item.name + '%'
                    }
                }
            });
            if (recipe.length > 0) {
                recipeList.push(fridgeList[i]);
            };
        };
        return recipeList;

    } catch (error) {
        throw error;
    };
};

module.exports = {
    GetFoodItemsInRecipe
};
