import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  console.log(currentUser)

  return (
    <div className="container">
      <header className="jumbotron size">
        <h3>
          Área do aluno: <strong>{currentUser.username}</strong>
        </h3>
      </header>

      <p>
        <strong>Seu Id em nosso sistema é:</strong> {currentUser.id}
      </p>
      <strong>Você tem permissões de:</strong>
      <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul>
      <div className="row">
        
      </div>
    </div>
  );
};

export default Profile;