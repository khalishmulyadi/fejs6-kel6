import { SET_LOGIN_STATUS } from "./types";

const setLoginStatus = () => {
  return (dispatch) => {
    if (JSON.parse(localStorage.getItem("user")) !== null) {
      dispatch({
        type: SET_LOGIN_STATUS,
        loginStatus: true,
      });
    }
  };
};

export default setLoginStatus;
