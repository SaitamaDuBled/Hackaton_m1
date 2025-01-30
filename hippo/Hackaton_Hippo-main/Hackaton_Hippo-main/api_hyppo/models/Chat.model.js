const { DataTypes } = require("sequelize");

module.exports = (instance) => {
    const Chat = instance.define("Chat", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        zone: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        date_time: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        tableName: "Chat",
        updatedAt: "updatedAt",
        createdAt: "createdAt",
        timestamps: true,
    });

    return Chat;
};