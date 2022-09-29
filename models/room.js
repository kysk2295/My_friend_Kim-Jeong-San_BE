const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");

module.exports = class Room extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                color: {
                    type: Sequelize.STRING(20),
                    allowNull: true,
                },
                startDate: {
                    type: Sequelize.DATEONLY,
                    allowNull: false,
                },
                startTime: {
                    type: Sequelize.TIME,
                    allowNull: true,
                },
                group: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Room",
                tableName: "rooms",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Room.hasMany(db.Payment);
    }
};
