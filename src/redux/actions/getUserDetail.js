import { GET_USER_DETAIL } from "./types";

const user = JSON.parse(localStorage.getItem("user"));
const email = JSON.parse(localStorage.getItem("email"));
var axios = require("axios");

var config = {
  method: "get",
  url: `https://asix-store.herokuapp.com/user/display/${email}`,
  headers: {
    Authorization: `Bearer ${user?.access_token}`,
  },
};

const getUserDetail = () => {
  return (dispatch) => {
    axios(config)
      .then(function (response) {
        // console.log(response.data, "data");
        dispatch({
          type: GET_USER_DETAIL,
          payload: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.error_message);
        window.location.replace("/auth/login");
      });
  };
};

export default getUserDetail;
