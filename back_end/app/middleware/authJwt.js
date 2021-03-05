//esse middleware auxilia no processamento da autorização de cada usuário.
//usaremos jwt para isso.
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

//primeira coisa é verificar o token que, neste caso, trafegará como 
//x-access-token.
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  //se não houver token para tudo e informa a falta.
  if (!token) {
    return res.status(403).send({
      message: "Não há token!"
    });
  }
  //se houver chamamos o jwt.verify pra avaliar esse token com base no
  //config.secret que criamos lá no auth.config.js
  //se tiver erro para tudo e informa.
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Não Autorizado!"
      });
    }
    //se estiver certinho o userId lá do verifyToken tem seu valor atribuido
    //como o decoded.id e chama o próximo passo com next().
    req.userId = decoded.id;
    next();
  });
};

//temos que verificar se o user que está logando é admin e para isso temos
//essa função que busca as roles e verifica se alguma é === a admin.
//se for, next() caso contrário manda solicitar a atribuição de Admin.
const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Solicite a atribuição de administrador!"
      });
      return;
    });
  });
};

//mesmo processo para moderador.
const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Solicite a atribuição de moderador!"
      });
    });
  });
};

//aqui é para tratar o caso de um user que é moderador e adinistrador.
const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Solicite a atribuição de administrador ou de moderador!"
      });
    });
  });
};

//aqui juntamos tudo antes de exportar.
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;