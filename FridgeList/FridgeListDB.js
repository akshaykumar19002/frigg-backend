const db = require('../Config/db');

async function GetFridgeListByFridgeId(fridgeId) {
    try {
        const fridgeList = await db.fridge_list.findAll({
            where: {
                fridge_id: fridgeId
            },
            include: [{
                model: db.food_item,
                attributes: ['name']
            }]
        });
        return fridgeList;
    } catch (error) {
        throw error;
    };
};

async function AddFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
    try {
        const fridgeList = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            }
        });
        if (fridgeList !== undefined && fridgeList !== null) {
            if(fridgeList.deletedAt === null) {
                fridgeList.quantity = parseInt(fridgeList.quantity) + parseInt(quantity);
                await fridgeList.save();
            } else {
                await fridgeList.restore();
                fridgeList.quantity = parseInt(quantity);
                await fridgeList.save();
            }
        } else {
            await db.fridge_list.create({
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                quantity: quantity,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            });
        }
        return true;
    } catch (error) {
        throw error;
    };
};
async function CreateOrRestoreFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
    
    console.log(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate);
    try {
        const fridgeList = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            },
            paranoid: false
        });
        if (fridgeList !== undefined && fridgeList !== null) {
            await fridgeList.restore();
            fridgeList.quantity = parseInt(quantity);
            await fridgeList.save();
        } else {
            await db.fridge_list.create({
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                quantity: quantity,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            });
        }
        return true;
    } catch (error) {
        throw error;
    };
};
async function UpdateFridgeListQuantityByCriteria(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
    try {
        const fridgeList = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            }
        });
        fridgeList.quantity = parseInt(quantity);
        await fridgeList.save();
        return true;
    } catch (error) {
        throw error;
    };
};
async function CreateFoodItemInFridgeList(fridgeId, foodItemId, quantity, purchaseDate, expectedExpiryDate) {
    try {
        await db.fridge_list.create({
            fridge_id: fridgeId,
            food_item_id: foodItemId,
            quantity: quantity,
            purchase_date: purchaseDate,
            expected_expiry_date: expectedExpiryDate
        });
        return true;
    } catch (error) {
        throw error;
    };
};
async function DeleteFoodItemFromFridgeList(fridgeId, foodItemId, purchaseDate, expectedExpiryDate) {
    try {
        const fridgeList = await db.fridge_list.findOne({
            where: {
                fridge_id: fridgeId,
                food_item_id: foodItemId,
                purchase_date: purchaseDate,
                expected_expiry_date: expectedExpiryDate
            }
        });
        await fridgeList.destroy();
        return true;
    } catch (error) {
        throw error;
    };
};



module.exports = {
    GetFridgeListByFridgeId,
    AddFoodItemInFridgeList,
    UpdateFridgeListQuantityByCriteria,
    CreateFoodItemInFridgeList,
    CreateOrRestoreFoodItemInFridgeList,
    DeleteFoodItemFromFridgeList
}