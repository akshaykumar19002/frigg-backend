const sequelize = require('sequelize');
const db = require('../Config/db');

async function fetchAll() {
    try {
        const dishes = await db.recipe_lists.findAll();
        return dishes;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    fetchAll
}