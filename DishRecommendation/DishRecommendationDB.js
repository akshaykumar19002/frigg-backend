const db = require('../Config/db');
const sequelize = require('sequelize');

async function GetFoodItemsInFridge(fridgeId) {
    try {
        let sql = "SELECT distinct(fi.name) FROM frigg.fridge_lists as fl inner join frigg.food_items as fi on fl.food_item_id = fi.id where fl.fridge_id = " + fridgeId + " and fl.deleted_at is null order by fl.expected_expiry_date desc";
        let food_names = await db.sequelize.query(sql, {
            type: sequelize.QueryTypes.SELECT
        });
        
        let recepie_list_names = [];
        for (let i = 0; i < food_names.length; i++) {
            const element = food_names[i];
            let sql2 = "select * from recipe_lists where ingredients like '%" + element.name.trim() + "%'";
            let recepie_list = await db.sequelize.query(sql2, {
                type: sequelize.QueryTypes.SELECT
            });
            recepie_list_names.push(...recepie_list.map(x => x.recipe_name));
        }
        
        return recepie_list_names.filter((v, i, a) => a.indexOf(v) === i);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    GetFoodItemsInFridge
};
