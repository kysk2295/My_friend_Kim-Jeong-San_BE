const Sequelize = require("sequelize");
const { INTEGER } = require("sequelize");
const { Poll } = require(".");

module.exports = class Menu extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                poll_id: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "Menu",
                tableName: "menus",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {}
};
