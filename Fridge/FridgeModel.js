module.exports = (sequelize, DataTypes) => {
    const Fridge = sequelize.define('fridge', {
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

    return Fridge;
};