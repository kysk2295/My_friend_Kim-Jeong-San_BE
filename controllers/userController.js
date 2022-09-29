const { sequelize } = require("../models");
const userService = require("../services/userService");
const ResponseDto = require("../dto/ResponseDto");
const roomService = require("../services/roomService");

module.exports = {
    deleteRoom: async function (req, res) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            await userService.deleteRoom(req, transaction);
            await roomService.deleteParticipantById(
                req.params.roomId,
                req.params.userId
            );
            await transaction.commit();
            res.status(200).send(new ResponseDto(200, "모임방 나가기 완료"));
        } catch (err) {
            await transaction?.rollback();
            console.log(err);
            res.status(500).send(
                new ResponseDto(
                    err.message ? 400 : 500,
                    err.message ? err.message : "모임방 나가기 실패"
                )
            );
        }
    },
};
