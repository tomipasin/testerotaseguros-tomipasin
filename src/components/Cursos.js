import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron cursos">
        <h3>Os cursos oferecidos são:</h3>

        <ul>
          <li>Administração.</li>
          <li>Agronomia.</li>
          <li>Análise e Desenvolvimento de Sistemas.</li>
          <li>Arquitetura e Urbanismo.</li>
          <li>Artes Cênicas.</li>
          <li>Artes Visuais.</li>
          <li>Banco de Dados.</li>
        </ul>
      </header>
    </div>
  );
};

export default Home;