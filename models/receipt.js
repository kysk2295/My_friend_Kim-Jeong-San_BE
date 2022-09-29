const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = class Receipt extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                date: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },
                amount: {
                    type: INTEGER,
                    allowNull: false,
                },
                menus: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
                payerId: {
                    type: INTEGER,
                    allowNull: false,
                },
                receiptPhoto: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                isEnd: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
                underscored: false,
                modelName: "Receipt",
                tableName: "receipts",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Receipt.belongsTo(db.Room);
        db.Receipt.hasMany(db.Menu);
    }
};
