import { GET_USER_DETAIL, GET_USER_ROLE, SET_LOGIN_STATUS } from "../actions/types";

// inisialisasi nilai awal dari state
const initialState = {
  idUser: null,
  dataUser: [],
  role: [],
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  // fungsi-fungsi reducer
  switch (action.type) {
    case GET_USER_DETAIL:
      return {
        ...state,
        dataUser: action.userDetail,
        idUser: action.userDetail.userId,
      };
    case GET_USER_ROLE:
      return {
        ...state,
        role: action.userRole,
      };
    case SET_LOGIN_STATUS:
      return {
        ...state,
        isLoggedIn: action.loginStatus,
      };

    default:
      return state;
  }
};

export default userReducer;
