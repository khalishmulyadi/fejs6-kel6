import { GET_USER_DETAIL } from "./types";
import axios from "axios";

const getUserDetail = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const email = JSON.parse(sessionStorage.getItem("email"));

  const refreshToken = (refresh_token) => {
    var configRefresh = {
      method: "get",
      url: "https://asix-store.herokuapp.com/refresh-token",
      headers: {
        Authorization: `Bearer ${refresh_token}`,
      },
    };

    axios(configRefresh)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        sessionStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch(function (error) {
        // console.log(error);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("email");
        window.location.replace("/auth/login");
      });
  };

  var config = {
    method: "get",
    url: `https://asix-store.herokuapp.com/user/display/${email}`,
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  };

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

        // refreshToken(user?.refresh_token).then(() => {
        //   axios(config).then(function (response) {
        //     // console.log(response.data, "data");
        //     dispatch({
        //       type: GET_USER_DETAIL,
        //       payload: response.data,
        //     });
        //   });
        // });
      });
  };
};

export default getUserDetail;
