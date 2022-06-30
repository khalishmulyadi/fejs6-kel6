import { GET_PRODUCT_PREVIEW } from "../actions/types";

// inisialisasi nilai awal dari state
const initialState = {
  idProduk: null,
  dataProduk: {},
  statusProduk: "",
  hargaTawar: null,
};

const productReducer = (state = initialState, action) => {
  // fungsi-fungsi reducer
  switch (action.type) {
    case GET_PRODUCT_PREVIEW:
      return {
        ...state,
        dataProduk: action.dataProductPreview,
      };

    default:
      return state;
  }
};

export default productReducer;
