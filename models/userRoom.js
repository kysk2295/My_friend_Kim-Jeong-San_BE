const Sequelize = require("sequelize");

module.exports = class UserRoom extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
            },
            {
                sequelize,
                timestamps: true, // create at 에 자동 설정
                underscored: false,
                modelName: "UserRoom",
                tableName: "userRoom",
                paranoid: true,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
    static associate(db) {
        db.Room.belongsToMany(db.User, {
            through: db.UserRoom,
            paranoid: true,
        });
        db.User.belongsToMany(db.Room, {
            through: db.UserRoom,
            paranoid: true,
        });
        db.Room.hasMany(db.UserRoom);
        db.UserRoom.belongsTo(db.Room, {
            foreignKey: "RoomId",
            sourceKey: "id",
        });
        db.User.hasMany(db.UserRoom);
        db.UserRoom.belongsTo(db.User, {
            foreignKey: "UserId",
            sourceKey: "id",
        });
    }
};
