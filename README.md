# testerotaseguros-tomipasin
Teste técnico para a empresa Rota Seguros.

### Credenciais de teste:
user: testeadmin@gmail.com
senha: teste1234


### O que foi feito? 

Neste CRUD utilizei uma base de dados em MySQL com tabelas para os usuários e para as atribuições. 
Utilizei um back end em nodeJS com Sequelize e Express para fazer a interface entre o front end e a base de dados. 
No front usei ReactJS com Bootstrap. 
A ideia é reproduzir o layout fornecido e, ao fazer login duas situações podem ocorrer:

#### Login de usuário COM permissões de administrador:
O usuário é direcionado para a página do seu perfil e à sua disposição estará um item na barra de navegação chamado "Painel de Administração". Nele é possível realizar a criação de novos usuários na base. 

#### Login de usuário SEM permissões de administrador:
O usuário é direcionado para a página do seu perfil. 

Como dados públicos, assessíveis com ou sem login, estará a lista de cursos disponíveis e a tela de login, além de "Ouvidoria" e "Contato" (não implementados).

### Screenshots:

<img src="https://tomipasin.com/assets/img/CRUD.jpg" />





