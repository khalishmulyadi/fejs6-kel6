import { GET_USER_DETAIL } from "./types";

const getUserDetail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    var axios = require("axios");

    var config = {
      method: "get",
      url: `https://asix-store.herokuapp.com/user/display/${user.email}`,
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        dispatch({
          type: GET_USER_DETAIL,
          userDetail: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        alert(error);
        window.location.replace("/auth/login");
      });
  };
};

export default getUserDetail;
