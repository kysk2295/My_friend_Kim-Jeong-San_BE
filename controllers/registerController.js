const { sequelize, User, Room } = require("../models/index");
const ResponseDto = require("../dto/ResponseDto");

module.exports = {
    getAccount: async (req, res) => {
        try {
            console.log(req.body);
            await User.update({
                accounts: req.body.accounts,
            }, {
                where: { id: req.params.userId }
            });
            res.status(200).send(new ResponseDto(200, "계좌입력 성공"));
        } catch (err) {
            console.log(err);
            res.status(500).send(new ResponseDto(500, "계좌입력 실패"));
        }
    },
    getProfile: async (req, res) => {
        try {
            const getmyaccount = await User.findOne({
                attributes: ['name', 'profilePhoto', 'accounts'],
                where: { id: req.params.userId }
            });
            if (!getmyaccount) {
                res.status(500).send(new ResponseDto(500, "해당 유저가 존재하지 않습니다"));
            }
            else {
                console.log(getmyaccount);
                res.status(200).send(new ResponseDto(200, "회원정보 가져오기 성공", getmyaccount));
            }
        } catch (err) {
            console.log(err);
            res.status(500).send(new ResponseDto(500, "회원정보 가져오기 실패"));
        }
    },
}