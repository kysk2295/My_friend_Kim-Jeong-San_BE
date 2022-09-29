const { INTEGER } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Poll extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                menu_id: {
                    type: INTEGER,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
                underscored: false,
                modelName: 'Poll',
                tableName: 'polls',
                paranoid: true,
                charset: 'utf8mb4',
                collate: 'utf8mb4_general_ci',
            }
        );
    }
    static associate(db) {
        db.Poll.belongsTo(db.Receipt);
        db.Poll.belongsTo(db.User);
    }
};
