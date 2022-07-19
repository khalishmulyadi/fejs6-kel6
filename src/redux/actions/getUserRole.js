import { GET_USER_ROLE } from "./types";

const getUserRole = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
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
        console.log(JSON.stringify(response.data));
        dispatch({
          type: GET_USER_ROLE,
          userRole: response.data.roles,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
};

export default getUserRole;
