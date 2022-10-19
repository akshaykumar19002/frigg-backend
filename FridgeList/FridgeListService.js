const FridgeItemDB = require('./FridgeListDB');

function DeleteProperties(response) {
    delete response.dataValues.createdAt;
    delete response.dataValues.updatedAt;
    delete response.dataValues.deletedAt;
}

var GroceryService = {
    GetAllFridgeListByFridgeId: async function (fridgeId) {
        try {
            let fridgeList = await FridgeItemDB.GetFridgeListByFridgeId(fridgeId);
            if (fridgeList === undefined || fridgeList.length === 0) {
                return {
                    message: "No item in fridge list"
                }
            }
            fridgeList.forEach(groceryListItem => {
                DeleteProperties(groceryListItem);
                groceryListItem.dataValues.grocery_item_name = groceryListItem.dataValues.grocery_item.name;
                delete groceryListItem.dataValues.grocery_item;
            });
            return fridgeList;
        } catch (error) {
            throw error;
        }
    },
    AddGroceryItem: async function (fridgeId, groceryItemId) {
        try {
            var response = await FridgeItemDB.AddOrIncreaseGroceryItemQuantityByOne(fridgeId, groceryItemId);
            DeleteProperties(response);
            return response;
        } catch (error) {
            throw error;
        }
    },
    DeleteGroceryItem: async function (fridgeId, groceryItemId) {
        try {
            var groceryItemDeleted = await FridgeItemDB.ReduceGroceryItemQuantityByOneOrDelete(fridgeId, groceryItemId);
            if (!groceryItemDeleted) {
                return {
                    message: "Item already doesn't exist in the fridge"
                }
            }
            return {
                message: "Grocery item deleted"
            };
        } catch (error) {
            throw error;
        }
    },
    UpdateFridgeListByGroceryItemslist: async function (fridgeId, groceryItemsList) {
        try {
            var groceryUpdated = await FridgeItemDB.UpdateFridgeListByFridgeIdAndGroceryItemslist(fridgeId, groceryItemsList);
            if (!groceryUpdated) {
                return {
                    message: "No item in fridge list"
                }
            }
            return groceryUpdated;
        } catch (error) {
            throw error;
        }
    }
};

module.exports = GroceryService;