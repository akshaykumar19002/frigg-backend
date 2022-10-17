module.exports = (sequelize, DataTypes) => {
    const GroceryItem = sequelize.define('grocery_item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        paranoid: true,
        underscored: true
    });

    return GroceryItem;
};