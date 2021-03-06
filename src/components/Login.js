import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import "bootstrap/dist/css/bootstrap.min.css";
import image from "../img/image.png";


const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          props.history.push("/profile");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };





  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 px-0">
          <img src={image} className="laranja" />
        </div>
        <div className="col-md-6 ">
        <h5 className="parag">PARÁGRAFO</h5>
        <p className="par">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas bibendum ligula nec urna condimentum maximus. Sed felis dui, sodales vitae libero in, ultrices faucibus sapien. Duis non vehicula mauris, eu maximus enim. Suspendisse at mauris sed tellus elementum auctor sit amet eu erat. Donec pharetra mauris et felis faucibus, vitae varius tortor scelerisque. Proin at consectetur augue, sit amet malesuada arcu. Praesent dignissim luctus tellus, blandit tempus felis venenatis sit amet.
        </p>

        <div className="card card-container">
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Email:
            <Input
                type="text"
                className="form-control border-warning "
                name="username"
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <Input
              type="password"
              className="form-control border-warning"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-secondary btn-block butt" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>LOGIN</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>


        </div>

      </div>


      



    </div>
  );
};

export default Login;