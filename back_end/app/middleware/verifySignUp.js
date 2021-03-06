//aqui criamos um middleware para verificar o signup, se o user não está
//duplicado e se as roles existem.
const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//verifica se o user não está duplicado antes da criaçao.
const checkDuplicateUsernameOrEmail = (req, res, next) => {

  // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  };


//e aqui esse middleware verifica se as roles definidas na criação
//desse user existem.
const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Não deu... Essa atribuição não existe = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

//organizamos tudo e exportamos.
const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
