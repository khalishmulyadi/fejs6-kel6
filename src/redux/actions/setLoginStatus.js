import { SET_LOGIN_STATUS } from "./types";

const setLoginStatus = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    if (user) {
      dispatch({
        type: SET_LOGIN_STATUS,
        loginStatus: true,
      });
    }
  };
};

export default setLoginStatus;
