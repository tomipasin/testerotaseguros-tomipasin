//aqui vamos inicializar o sequelize e definir a lógica
//de associação entre usuários e roles:
//uma role pode ser atribuida a vários users e 
//um user pode ter várias roles.

const config = require("../config/db.config");
const Sequelize = require("sequelize");

//nossa const sequelize busca as configs do nosso db para a comunicação.
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

//criamos um objeto vazio para o nosso db.
const db = {};

//e com notação de ponto começamos a atribuir valores para esse objeto.
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

//aqui a regra de uma role para muitos users.
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

//e aqui a de um user que pode ter muitas roles.
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

//também definimos aqui quais roles estão disponíveis.
db.ROLES = ["user", "admin", "moderator"];
//e exportamos.
module.exports = db;