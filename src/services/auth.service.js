import axios from "axios";

const loginUser = (email, password) => {
  var data = JSON.stringify({
    email,
    password,
  });

  var config = {
    method: "post",
    url: "https://asix-store.herokuapp.com/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  return axios(config).then(function (response) {
    if (response.data.access_token) {
      sessionStorage.setItem("user", JSON.stringify(response.data));
      sessionStorage.setItem("email", JSON.stringify(email));
      // console.log(JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("email");
};

const authService = {
  loginUser,
  logout,
};

export default authService;
