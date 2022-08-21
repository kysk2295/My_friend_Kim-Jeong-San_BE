const { INTEGER } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = class Item extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                name: {
                    type: Sequelize.STRING(200),
                    allowNull: false,
                },
                amount: {
                    type: INTEGER,
                    allowNull: false,
                },
                price: {
                    type: INTEGER,
                    allowNull: false,
                },
                sum: {
                    type: INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
                underscored: false,
                modelName: "Item",
                tableName: "items",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Item.belongsTo(db.Menu);
    }
};
