import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Cursos from "./components/Cursos";
import Profile from "./components/Profile";
import BoardAdmin from "./components/BoardAdmin";
import logo from "./img/logo.png";
import logoHome from "./img/home-icon.png";
import cursos from "./img/classes-icon.png";
import areaDoAluno from "./img/student-icon.png";
import contato from "./img/mail-icon.png";
import faq from "./img/faq-icon.png";
import graduation from "./img/icon-graduation.png";
import admIcon from "./img/admin.png";
import logout from "./img/logout.png";
import rodape from "./img/rodape.png";


const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();


    if (user) {
      setCurrentUser(user);
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>

      <nav class="navbar navbar-expand-lg navbar-light bg-nav">
        <div class="container-fluid">
          <img src={logo} className="logo" />
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/home"} className="branco">
                  <img src={logoHome} className="icons" />
              Home
            </Link>
              </li>
              <li className="nav-item">
                <Link to={"/cursos"} className="branco">
                  <img src={cursos} className="icons" />
              Cursos
            </Link>
              </li>
              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="branco">
                    <img src={admIcon} className="icons" />
                Painel de Administração
              </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/profile"} className="branco">
                    <img src={areaDoAluno} className="icons" />
              Aluno: {currentUser.email}
                  </Link>
                </li>
              )}



              {currentUser ? (
                <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a href="/home" className="branco" onClick={logOut}>
                      <img src={logout} className="icons" />
                LogOut
              </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav mr-auto">
                  <li className="nav-item ml-auto">
                    <Link to={"#"} className="branco">
                      <img src={contato} className="icons" />
              Contato
            </Link>
                  </li>

                  <li className="nav-item mr-auto">
                    <Link to={"#"} className="branco">
                      <img src={faq} className="icons" />
              Ouvidoria
            </Link>
                  </li>

                  <li className="nav-item mr-auto">
                    <img src={graduation} className="icons" />
                  </li>

                </div>
              )}

            </ul>
          </div>
        </div>
      </nav>


      <div>
        <Switch>
          <Route exact path={["/", "/home"]} component={Login} />
          <Route exact path="/cursos" component={Cursos} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/admin" component={Register} />
        </Switch>
      </div>

      <div class="footer">
        <img src={rodape} className="rodape" />
      </div>
    </div>
  );
};

export default App;