const activitiesService = require('../services/Activity.service');
const alertsService = require('../services/Alert.service');

exports.getActivities = async (req, res) => {
    try {
        const { zone } = req.query;
        const activities = await activitiesService.getActivities(zone);
        const alert = await alertsService.getAlert(zone);

        var filtredActivities = [];
        activities.forEach(function(activity) {
            if(activity.type == alert.type) {
                filtredActivities.push(activity);
            }
        });

        res.status(200).send(filtredActivities);
    } catch (error) {
        res.status(500).send({ message: error.message || "Erreur lors de la récupération des activités." });
    }
};