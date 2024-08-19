const { Router } = require("express");
const router = Router();
const users = require("../models/users.js");
const jwt = require("jsonwebtoken");
const { server_passcode } = require("../models/config.model.js");

router.post("/email", async (req, res) => {
    console.log(req.headers.authorization === process.env.SERVER_PASSCODE);
    if (req.headers.authorization === server_passcode) {
        const { email } = req.body;
        const isExist = await users.findOne({ email });
        if (isExist) {
            res.json({
                success: false,
                message: "This email (" + email + ") is exist",
                reqData: req.body,
            });
        } else {
            res.json({ success: true, auth: req.headers.authorization });
        }
    } else {
        res.send({ message: "Auth not found" });
    }
});

router.post("/");

router.post("/phone", async (req, res) => {
    if (req.headers.authorization === server_passcode) {
        const { phoneNumber } = req.body;
        const isExist = await users.findOne({ phoneNumber });
        if (isExist) {
            res.json({
                success: false,
                message: "This phone (" + phoneNumber + ") is exist",
                reqData: req.body,
            });
        } else {
            res.json({ success: true, auth: req.headers.authorization });
        }
    } else {
        res.send({ message: "Auth not found" });
    }
});

module.exports = router;
