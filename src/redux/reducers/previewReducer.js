import { GET_DETAIL_PRODUCT, GET_STATUS_PRODUCT } from "../actions/types";

// inisialisasi nilai awal dari state
const initialState = {
  idProduct: null,
  dataProduct: [],
  hargaTawar: null,
  statusProduct: false,
};

const previewReducer = (state = initialState, action) => {
  // fungsi-fungsi reducer
  switch (action.type) {
    case GET_DETAIL_PRODUCT:
      return {
        ...state,
        dataProduct: action.payload,
      };
    case GET_STATUS_PRODUCT:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default previewReducer;
