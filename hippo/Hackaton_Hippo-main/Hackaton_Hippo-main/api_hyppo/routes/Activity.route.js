const express = require("express");
const activity = require("../controllers/Activity.controller");

const router = express.Router();


router.get("/", activity.getActivities);


module.exports = (app) => {
    app.use("/activity", router);
};