import { SET_LOGIN_STATUS } from "./types";

const setLoginStatus = () => {
  return (dispatch) => {
    dispatch({
      type: SET_LOGIN_STATUS,
      loginStatus: true,
    });
  };
};

export default setLoginStatus;
