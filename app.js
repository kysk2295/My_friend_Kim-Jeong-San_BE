const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const roomRouter = require("./routes/roomRoute");
const paymentRouter = require("./routes/paymentRoute");

const bodyParser = require("body-parser");

dotenv.config();
const { sequelize } = require("./models");
// const { connect } = require("./config/db");

const app = express();
app.set("port", process.env.PORT || 8001);

sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결됨.");
    })
    .catch((err) => {
        console.error(err);
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/user", userRouter);



app.use(morgan("dev"));
app.use(cors());
app.use(express.json()); // json 파싱

app.use("/room", roomRouter);
app.use("/payment", paymentRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번 포트에서 대기 중");
});