//quando um usuário manda um request, seja ele get, post, put ou delete,
//aqui é que definimos como o nosso servidor vai responder.

const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //no caso do signup determinamos que sejam verificados se o username e o 
  //email não estão duplicados. 
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    //se estiver ok prosseguimos com o auth.controller.
    controller.signup
  );

  //no caso do login basta a verificação que já fizemos em auth.controller.
  app.post("/api/auth/signin", controller.signin);
};