const { Sequelize } = require("sequelize");
//const dbConfig = require("../config/db.config");
const dbmsConfig = require("../config/dbms.config");

// Création de l'instance Sequelize
//const instance = new Sequelize(dbConfig);
const instance = new Sequelize(dbmsConfig);

// Models
const models = {};
models.Chat = require("./Chat.model")(instance);
models.Activity = require("./Activity.model")(instance);
models.Alert = require("./Alert.model")(instance);

// // Associations
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// instance.sync({ force: true }).then(() => {
//     console.log("La base de données a été synchronisée avec succès.");
//   })
//   .catch((err) => {
//     console.error("Erreur lors de la synchronisation de la base de données :", err);
//   });

module.exports = {
  instance,
  ...models,
};
