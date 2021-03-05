//servidor mysql LOCAL implementado com dados de teste.
//ao fazer deploy tem que alterar. 
module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "caramba",
    DB: "testdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  