const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
dotenv.config();

router.post("/payment", async (req, res) => {
    try {
        const { currency, price } = req.body;

        res.status(200).json({ status: 1, message: "Төлбөр амжилттай төлөгдлөө" });
    } catch (err) {
        res.status(500).json({ status: 0, message: err.message });
    }
});

module.exports = router;
