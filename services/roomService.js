const Sequelize = require("../models/index");
const userService = require("./userService");
const UserDto = require("../dto/UserDto");

module.exports = {
    createRoom: async function (req, transaction) {
        const room = await Sequelize.Room.create(
            {
                name: req.body.name,
                color: req.body.color,
                startDate: req.body.startDate,
                startTime: req.body.startTime,
                group: req.body.group,
            },
            {
                transaction: transaction,
            }
        );
        const group = req.body.group;
        if (group)
            group.forEach((userId) => {
                userService.findUserById(userId).then((user) => {
                    if (user) room.addUser(user.id, { paranoid: false });
                });
            });
    },
    findRoomById: async function (roomId) {
        return await Sequelize.Room.findOne({
            where: { id: roomId },
        });
    },

    deleteRoomById: async function (id, transaction) {
        return await Sequelize.Room.destroy(
            { where: { id: id } },
            { transaction: transaction }
        );
    },
    deleteParticipantById: async function (id, userId, transaction) {
        const room = await Sequelize.Room.findOne({ where: { id: id } });
        if (room == null) throw new Error("모임방을 찾을 수 없습니다.");
        let group = room.group;

        if (group) {
            group = group.filter((member) => {
                return member != userId;
            });
            if (group.length > 0)
                await Sequelize.Room.update(
                    { group: group },
                    { where: { id: id } },
                    { transaction }
                );
            else {
                await Sequelize.Room.destroy(
                    { where: { id: id } },
                    { transaction }
                );
            }
        }
    },

    getGroupById: async function (id) {
        const room = await this.findRoomById(id);
        if (room === null) throw Error("모임방을 찾을 수 없습니다.");
        let users = [];
        for (const userId of room.dataValues.group) {
            console.log(userId);
            await Sequelize.User.findByPk(userId).then((user) => {
                if (user !== null) users.push(new UserDto(user));
            });
        }
        return users;
    },

    groupByDate: function (rooms) {
        const grouped = rooms.reduce((group, room) => {
            const { startDate } = room;
            group[startDate] = group[startDate] ?? [];
            group[startDate].push(room);
            return group;
        }, {});

        return grouped;
    },

    getRoomByDate: function (list, date) {
        for (const [key, value] of Object.entries(list)) {
            if (key === date) {
                return value;
            }
        }
        return null;
    },

    getRoomByMonth: function (list, yyyymm) {
        const result = [];
        for (const [key, value] of Object.entries(list)) {
            if (key.toString().includes(yyyymm)) result.push(...value);
        }
        return result.length === 0 ? null : result;
    },
};
