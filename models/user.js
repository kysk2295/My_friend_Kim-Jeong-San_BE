const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.STRING(300),
                    primaryKey: true,
                    autoIncrement: false,
                    allowNull: true,
                },
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                },
                email: {
                    type: Sequelize.STRING(30),
                    allowNull: false,
                },
                accounts: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },

                profilePhoto: {
                    type: Sequelize.STRING(100),
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: "User",
                tableName: "users",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {}
};
