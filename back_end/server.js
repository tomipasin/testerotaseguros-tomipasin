const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//habilitando cors para que o servidor 
//funcione em ambiente de produção com o react na porta 3000. 
//Podem ser necessárias alterações.
var corsOptions = {
  origin: "http://localhost:3000"
};
app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;

//essa função deixo em true somente para inicializar o db com as 
//tabelas certinhas... depois passo para false.
db.sequelize.sync({force: false}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
//criação de atribuições padrão.
function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}

//aqui o express faz o parse de urlencoded 
app.use(express.urlencoded({ extended: true }));

//e aqui o parse de json 
app.use(express.json());

// rota de home
app.get("/", (req, res) => {
  res.json({ message: "Express rodando OK!" });
});

// restante das rotas
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// e as configs de porta do servidor.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});