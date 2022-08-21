const { INTEGER, INET } = require("sequelize");
const Sequelize = require("sequelize");

module.exports = class Vote extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                user_id: {
                    type: INTEGER,
                    allowNull: false,
                },
                items: {
                    type: Sequelize.JSON,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
                underscored: false,
                modelName: "Vote",
                tableName: "votes",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Vote.belongsTo(db.Poll);
        db.Vote.belongsTo(db.Menu);
    }
};
