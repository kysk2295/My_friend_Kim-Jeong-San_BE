const Sequelize = require("sequelize");

module.exports = class AccountBook extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                },
                accounts: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
                underscored: false,
                modelName: "AccountBook",
                tableName: "accountBooks",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
};
