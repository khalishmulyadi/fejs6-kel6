import { GET_USER_DETAIL, GET_USER_ROLE } from "../actions/types";

// inisialisasi nilai awal dari state
const initialState = {
  idUser: null,
  dataUser: [],
  role: null,
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  // fungsi-fungsi reducer
  switch (action.type) {
    case GET_USER_DETAIL:
      return {
        ...state,
        dataUser: action.payload,
      };
      break;
    case GET_USER_ROLE:
      return {
        ...state,
        role: action.payload,
      };
      break;

    default:
      return state;
  }
};

export default userReducer;
