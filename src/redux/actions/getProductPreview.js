import { GET_PRODUCT_PREVIEW } from "./types";

const getProductPreview = (dataProduct) => {
  return (dispatch) => {
    dispatch({
      type: GET_PRODUCT_PREVIEW,
      dataProductPreview: dataProduct,
    });
    // console.log("data diterima", dataProduct);
  };
};

export default getProductPreview;
