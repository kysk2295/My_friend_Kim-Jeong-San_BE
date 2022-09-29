const Sequelize = require("../models/index");
const Payemnt = require("../models/payment");

module.exports = {
    findAllPayments: async function () {
        return await Sequelize.Payment.findAll();
    },

    findByRoomId: async function (roomId) {
        return await Sequelize.Payment.findAll({
            where: { RoomId: roomId },
        });
    },
    findRoomPayments: async function (roomId) {
        const payments = await Sequelize.Payment.findAll({
            //attributes: ["id", "date", "amount", "payerId", "createdAt"],
            where: { RoomId: roomId },
        });
        const result = [];
        for (i = 0; i < payments.length; i++) {
            p = payments[i];
            await Sequelize.User.findByPk(p.payerId).then((user) => {
                let date = p.dataValues.date;
                date = date.slice(5);
                date = date.replace("-", ".");
                result.push({
                    payerName: user.dataValues.name,
                    date: date,
                    amount: p.dataValues.amount,
                    num: i + 1,
                });
            });
        }
        return result;
    },
    createVote: async function (req, transaction) {
        const items = req.body.items;
        await Sequelize.Vote.create(
            {
                PollId: req.body.poll,
                MenuId: req.body.menu,
                items: req.body.items,
                user_id: req.body.user,
            },
            { transaction: transaction }
        );
        // for (i in items) {
        //     await Sequelize.Vote.create(
        //         {
        //             PollId: req.body.poll,
        //             MenuId: req.body.menu,
        //             item_id: i,
        //             user_id: req.body.user,
        //         },
        //         { transaction: transaction }
        //     );
        // }
    },
    updateVote: async function (req, transaction) {
        const items = req.body.items;
        await Sequelize.Vote.update(
            { items: req.body.items },
            {
                where: {
                    PollId: req.body.poll,
                    MenuId: req.body.menu,
                    user_id: req.body.user,
                },
            },
            { transaction: transaction }
        );
    },
    findPayments: async function (roomId) {
        const nPayments = await Sequelize.Payment.findAll({
            attributes: ["amount", "payerId", "group"],
            where: { RoomId: roomId },
        });
        const result = [];
        for (i = 0; i < nPayments.length; i++) {
            p = nPayments[i];
            await Sequelize.User.findByPk(p.payerId).then((user) => {
                result.push({
                    payerId: p.dataValues.payerId,
                    payerName: user.dataValues.name,
                    amount: p.dataValues.amount,
                    group: p.dataValues.group,
                });
            });
        }
        return result;
    },
    findUserName: async function (userId) {
        const user = await Sequelize.User.findByPk(userId);
        const result = user.dataValues.name;
        return result;
    },
    findPollIdByMenu: async function (menuId) {
        const poll = await Sequelize.Poll.findOne({
            where: { menu_id: menuId },
        });
        const result = poll.dataValues.id;
        return result;
    },
    findMenuList: async function (roomId) {
        const receipt = await Sequelize.Receipt.findAll({
            where: { RoomId: roomId },
        });
        let receiptIdList = [];
        for (let r of receipt) {
            receiptIdList.push(r.dataValues.id);
        }
        let pollIdList = [];
        for (let r of receiptIdList) {
            let poll = await Sequelize.Poll.findOne({
                where: { ReceiptId: r },
            });
            pollIdList.push(poll.dataValues.id);
        }
        let menuIdList = [];
        for (let p of pollIdList) {
            let menu = await Sequelize.Menu.findOne({
                where: { poll_id: p },
            });
            menuIdList.push(menu.dataValues.id);
        }
        return menuIdList;
    },
    findItemList: async function (menuId) {
        let itemIdList = [];
        const item = await Sequelize.Item.findAll({
            where: { MenuId: menuId },
        });
        for (let i of item) {
            itemIdList.push(i.dataValues.id);
        }
        return itemIdList;
    },
    // 각 아이템에 어떤 유저들이 투표했는지
    findVoteList: async function (pollId, itemIdList) {
        const vote = await Sequelize.Vote.findAll({
            where: { PollId: pollId },
        });
        let voteList = {};
        for (let i of itemIdList) {
            voteList[`${i}`] = [];
        }
        for (let v of vote) {
            for (let i of v.dataValues.items) {
                voteList[`${i}`].push(v.dataValues.user_id);
            }
        }
        console.log("voteList", voteList);
        return voteList;
    },
    findReceiptPayerId: async function (menuId) {
        const pollId = await this.findPollIdByMenu(menuId);
        const poll = await Sequelize.Poll.findByPk(pollId);
        const result = poll.dataValues.UserId;
        return result;
    },
    findItemSum: async function (itemId) {
        const item = await Sequelize.Item.findByPk(itemId);
        const result = item.dataValues.sum;
        return result;
    },
    createPayment: async function (req, transaction) {
        await Sequelize.Payment.create(
            {
                payerId: req.body.payer,
                RoomId: req.body.roomId,
                amount: req.body.amount,
                group: req.body.group,
                date: req.body.date,
            },
            { transaction: transaction }
        );
    },
    findPaymentList: async function (roomId) {
        const payments = await Sequelize.Payment.findAll({
            where: { RoomId: roomId },
        });
        const result = [];
        for (i = 0; i < payments.length; i++) {
            p = payments[i];
            let userList = [];
            for (j = 0; j < p.group.length; j++) {
                await Sequelize.User.findByPk(p.group[j]).then((user) => {
                    userList.push(user.name);
                });
            }
            await Sequelize.User.findByPk(p.payerId).then((user) => {
                let date = p.dataValues.date;
                date = date.slice(5);
                date = date.replace("-", ".");
                result.push({
                    date: date,
                    num: i + 1,
                    amount: p.dataValues.amount,
                    payerName: user.dataValues.name,
                    userName: userList,
                });
            });
        }
        return result;
    },
    getPaymentDate: async function (roomId) {
        const room = await Sequelize.Room.findByPk(roomId);
        let result = room.startDate;
        result = result.replace("-", ".");
        result = result.replace("-", ".");
        return result;
    },
};
