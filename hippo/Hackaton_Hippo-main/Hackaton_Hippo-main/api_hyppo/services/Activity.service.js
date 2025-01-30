const { Activity, Alert } = require("../models/index");

class UserService {

  async getActivities() {
    const activities = await Activity.findAll();
    return activities;
  }

}

module.exports = new UserService();