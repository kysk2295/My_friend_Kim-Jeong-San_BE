const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = class Payemnt extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                amount: {
                    type: INTEGER,
                    allowNull: false,
                },
                date: {
                    type: Sequelize.DATEONLY,
                    allowNull: true,
                },
                payerId: {
                    type: INTEGER,
                    allowNull: false,
                },
                group: {
                    type: Sequelize.JSON,
                    allowNull: true,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
                underscored: false,
                modelName: "Payment",
                tableName: "payments",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Payment.belongsTo(db.Room);
    }
};
