const sequelize = require('sequelize');
const db = require('../Config/db');

async function CreateFoodItem(name, expected_expiry_days) {
    try {
        const foodItem = await db.food_item.findOne({
            where: {
                name: name
            },
            paranoid: false,
        });
        if (foodItem) {
            foodItem.restore();
            await foodItem.save();
            return foodItem;
        } else {
            const foodItem = await db.food_item.create({
                name: name,
                expected_expiry_days: expected_expiry_days
            });
            return foodItem;
        }
    } catch (error) {
        throw error;
    }
}

async function DeleteFoodItem(id) {
    try {
        const foodItem = await db.food_item.destroy({
            where: {
                id: id
            }
        });
        return foodItem;
    } catch (error) {
        throw error;
    }
}

async function GetAllFoodItems() {
    try {
        const foodItems = await db.food_item.findAll();
        return foodItems;
    } catch (error) {
        throw error;
    }
}

async function GetFoodItemById(id) {
    try {
        const foodItem = await db.food_item.findByPk(id);
        return foodItem;
    } catch (error) {
        throw error;
    }
}

async function GetFoodItemByName(name) {
    try {
        const foodItem = await db.food_item.findOne({
            where: {
                name: name
            }
        });
        return foodItem;
    } catch (error) {
        throw error;
    }
}

async function GetFoodItemsByPartialName(name) {
    try {
        const foodItems = await db.food_item.findAll({
            where: {
                name: {
                    [sequelize.Op.like]: `%${name}%`
                }
            }
        });
        return foodItems;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    CreateFoodItem,
    DeleteFoodItem,
    GetAllFoodItems,
    GetFoodItemById,
    GetFoodItemsByPartialName,
    GetFoodItemByName
}