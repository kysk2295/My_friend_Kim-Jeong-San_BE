const express = require("express");
const roomController = require("../controllers/roomController");
const router = express.Router();

router.post("/", roomController.createRoom);
router.get("/", roomController.getRooms);
router.put("/:roomId", roomController.updateGroup);
router.get("/:roomId/group", roomController.getGroup);

router.get("/schedule", roomController.getSchedule);

module.exports = router;
