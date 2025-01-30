const express = require("express");
const admin = require("../controllers/Admin.controller");

const router = express.Router();


router.get("/", admin.getCmd);


module.exports = (app) => {
    app.use("/admin", router);
};