const express = require("express");
const alert = require("../controllers/Alert.controller");

const router = express.Router();


router.get("/", alert.getAlert);


module.exports = (app) => {
    app.use("/alert", router);
};