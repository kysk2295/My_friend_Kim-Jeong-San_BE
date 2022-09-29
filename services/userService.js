const db = require("../models/index");
const { Room, User, UserRoom } = require("../models/index");
const Sequelize = require("../models/index");
const paymentService = require("./paymentService");
const RoomDto = require("../dto/RoomDto");

module.exports = {
    findUserById: async function (id) {
        return await Sequelize.User.findOne({ where: { id: id } });
    },

    deleteRoom: async function (req, transaction) {
        const userId = req.query.userId;
        const roomId = req.params.roomId;

        return await Sequelize.UserRoom.findAll().then(() => {
            Sequelize.UserRoom.destroy(
                {
                    where: {
                        UserId: userId,
                        RoomId: roomId,
                    },
                },
                { transaction }
            );
        });
    },

    getPayments: async function (id) {
        let payments = [];
        const list = await paymentService.findByUserId(id);
        for (let i = 0; i < list.length; i++) {
            let payment = await Sequelize.Payment.findOne({
                where: { id: list[i].PaymentId },
            });
            payments.push(payment);
        }
        return payments;
    },

    getRooms: async function (id) {
        const result = await User.findAll({
            include: {
                model: Room,
                attributes: [
                    "id",
                    "name",
                    "color",
                    "startDate",
                    "startTime",
                    "group",
                ],
            },
            where: { id: id },
        }).then((it) => {
            if (it.length != 1) throw Error("일치하는 회원정보가 없습니다.");
            return it[0].get("Rooms").map((room) => {
                return new RoomDto(room);
            });
        });
        return result;
    },
};
