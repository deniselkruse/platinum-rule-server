module.exports = (sequelize, DataTypes) => {
    const Help = sequelize.define('help', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        availability: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instances: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        inactiveDate: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Help
}