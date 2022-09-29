const { UserRoom } = require("../models");
const UserDto = require("./UserDto");

module.exports = class RoomDto {
    id;
    name;
    color;
    startDate;
    startTime;
    group = [];
    userList = [];

    constructor(room) {
        this.id = room.dataValues.id;
        this.name = room.dataValues.name;
        this.color = room.dataValues.color;
        this.startDate = room.dataValues.startDate;
        this.startTime = room.dataValues.startTime;
        this.group = room.dataValues.group;
    }

    addUser(user) {
        this.userList.push(new UserDto(user));
    }

    addUserList(list) {
        this.userList = list;
    }

    get() {
        return {
            roomId: this.id,
            name: this.name,
            color: this.color,
            startDate: this.startDate,
            startTime: this.startTime,
            userList: this.userList,
        };
    }
};
