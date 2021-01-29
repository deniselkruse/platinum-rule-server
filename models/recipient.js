module.exports = (sequelize, DataTypes) => {
    const Recipient = sequelize.define('recipient', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        availability: {
            type: DataTypes.ARRAY(DataTypes.STRING),
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
    return Recipient
}