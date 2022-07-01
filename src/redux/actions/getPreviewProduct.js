import { GET_DETAIL_PRODUCT, GET_STATUS_PRODUCT } from "./types";

const getPreviewProduct = () => {
  return (dispatch) => {
    if (JSON.parse(localStorage.getItem("product")) !== null) {
      dispatch({
        type: GET_DETAIL_PRODUCT,
        loginStatus: true,
      });
    }
    dispatch({
      type: GET_STATUS_PRODUCT,
      loginStatus: true,
    });
  };
};

export default getPreviewProduct;