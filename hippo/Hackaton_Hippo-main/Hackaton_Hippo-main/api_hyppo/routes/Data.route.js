const express = require("express");
const { Activity, Chat, Alert } = require("../models");

const router = express.Router();


router.post("/", async (req, res) => {
    const { Activity: activityData, Chat: chatData, Alert: alertData } = req.body;

    try {
        if (activityData && activityData.length) {
            await Activity.bulkCreate(activityData);
        }
        if (chatData && chatData.length) {
            await Chat.bulkCreate(chatData);
        }
        if (alertData && alertData.length) {
            await Alert.bulkCreate(alertData);
        }
        res.status(200).send("Data added to all tables successfully");
    } catch (error) {
        res.status(500).send("Error adding data to tables: " + error.message);
    }
});


module.exports = (app) => {
    app.use("/addData", router);
};

