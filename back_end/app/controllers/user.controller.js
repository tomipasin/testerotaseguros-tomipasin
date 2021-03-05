//aqui vamos testar as autorizações...
exports.allAccess = (req, res) => {
    res.status(200).send("Conteúdo público");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Conteúdo do usuário logado");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Conteúdo do administrador logado");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Conteúdo do moderador logado");
  };