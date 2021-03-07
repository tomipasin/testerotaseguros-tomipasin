import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://testerotaseguros.herokuapp.com/";

class AuthService {
register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password
  });
  
};

login = (email, password) => {
  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
     

      return response.data;
    });
};

logout = () => {
  localStorage.removeItem("user");
};

getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
  
};

}
console.log(localStorage.user)
export default new AuthService();

