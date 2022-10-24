module.exports = (sequelize, DataTypes) => {
    const FoodItem = sequelize.define('food_item', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        expected_expiry_days: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true
    });

    return FoodItem;
};