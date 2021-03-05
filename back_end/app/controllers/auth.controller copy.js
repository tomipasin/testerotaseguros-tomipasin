//aqui vamos executar as funções de autenticação.

//usaremos aqui o objeto db de /models/index.js
const db = require("../models");
//a consig de auth.config
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
//e aqui requisitamos jwt e bcrypt para quando formos gerar o token.
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

//função de criação de um novo user... 
exports.signup = (req, res) => {
  // salvamos o user no db encriptando a sua senha.
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
  //então (assíncrona ;-) ) vamos ver se foram definidas roles para esse user
  //se tiver sido definidas, com Op.or colocamos todas em um objeto. 
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        })
        //e por fim damos um setRoles para atribuir de fato elas ao user
        //e retornamos uma msg
        .then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Usuário registrado com sucesso!" });
          });
        });
        //caso nenhuma role tenha sido definida na criação vamos
        //defnir a role básica '1' de user e confirmar o registro.
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Usuário registrado com sucesso!!" });
        });
      }
    })
    //se der erro vamos verificaro por aqui.
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

//aqui a função de login. Ela busca o usuário informado.
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      //se não existir aquele usuário informa o erro.
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }
      //se existir, comapara a senha fornecida com a existente para o usuário.
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
        //se a senha não for igual retorna o erro de senha inválida.
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Senha inválida!"
        });
      }
      //se a senha for igual cria uma variável de token usando jwt que expira em 
      //86400 segundos, ou seja, 24h.
      let token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400
      });
      //usuário verificado e com token criado é hora de buscar suas atribuições.
      //aqui criamos um array para as authorities, que buscará as roles 
      //do user recém logado e, com um for, vai inserir cada uma delas no array
      //de authorities usando push.
      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        //depois de ter feito isso manda uma resposta com sucesso em formato de
        //objeto: 
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token
        });
      });
    })
    //se der erro...
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};