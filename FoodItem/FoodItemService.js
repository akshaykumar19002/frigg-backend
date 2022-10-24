const FoodItemDB = require('./FoodItemDB');

var FoodItemService = {
    AddFoodItem: async function (name, expected_expiry_days) {
        try {
            var response = await FoodItemDB.CreateFoodItem(name, expected_expiry_days);
            this.DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    RemoveFoodItem: async function (id) {
        try {
            var foodItem = await FoodItemDB.DeleteFoodItem(id);
            if (!foodItem) {
                throw new Error("Food Item not found");
            }
            return {message: "Food item deleted"};
        } catch (error) {
            throw error;
        }
    },
    GetAllFoodItems: async function () {
        try {
            var response = await FoodItemDB.GetAllFoodItems();
            response.forEach(element => {
                this.DeleteProperties(element);
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    GetFoodItemById: async function (id) {
        try {
            var foodItem = await FoodItemDB.GetFoodItemById(id);
            if (!foodItem) {
                throw new Error("Food Item not found");
            }
            this.DeleteProperties(foodItem);
            return foodItem;
        } catch (error) {
            throw error;
        }
    },
    GetFoodItemByPartialName: async function (name) {
        try {
            var response = await FoodItemDB.GetFoodItemsByPartialName(name);
            response.forEach(element => {
                this.DeleteProperties(element);
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    DeleteProperties: function (response) {
        delete response.dataValues.createdAt;
        delete response.dataValues.updatedAt;
        delete response.dataValues.deletedAt;
    }
};

module.exports = FoodItemService;