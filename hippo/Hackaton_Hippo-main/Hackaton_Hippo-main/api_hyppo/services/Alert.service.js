const { Alert } = require("../models/index");
const { Op } = require("sequelize");

class AlertService {

async getAlert(zone) {
    const latestAlert = await Alert.findOne({
        where: {
            zones: {
                [Op.like]: `%${zone}%`
            }
        },
        order: [['date_time', 'DESC']]
    });
    return latestAlert;
}

}

module.exports = new AlertService();