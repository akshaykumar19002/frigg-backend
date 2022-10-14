module.exports = (sequelize, DataTypes) => {
    const FridgeUser = sequelize.define('fridge_user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fridge_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        paranoid: true,
        underscored: true
    });

    return FridgeUser;
};