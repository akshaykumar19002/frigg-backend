module.exports = (sequelize, DataTypes) => {
    const Fridge = sequelize.define('fridge', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    }, {
        paranoid: true,
        underscored: true
    });

    return Fridge;
};