const { sequelize, User, Room } = require("../models/index");
const ResponseDto = require("../dto/ResponseDto");

const kakao = {
    clientID: '187dfbd8517a2fdb721af0f630552827',
    clientSecret: '08NwRRAOnO5kKs8pCdYsU953VMna3A3T',
    redirectUri: 'http://localhost:3000/auth/kakao/callback'
}

module.exports = {
    getKakaoUser: async(req, res) => {
        try{
            console.log(req.body);
            const registerUser = await User.findOne({
                where: { id: req.body.userId }
            });
            if (registerUser === null) {
                const newUser = await User.create({
                    id: req.body.userId,
                    name: req.body.name,
                    email: req.body.email,
                    profilePhoto: req.body.profilePhoto,
                });
                res.status(201).send(new ResponseDto(201, "최초 로그인 성공, 계좌등록 필요"));
            }
            else {
                res.status(200).send(new ResponseDto(200, "로그인 성공"));
            }
        } catch(err) {
            console.log(err);
            res.status(500).send(new ResponseDto(500, "로그인 실패"));
        }
    },
}