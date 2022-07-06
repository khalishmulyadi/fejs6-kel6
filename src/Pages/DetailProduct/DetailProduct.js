import React from "react";
import DetailProduk from "../../components/DetailProduk/DetailProduk";

const DetailProduct = (props) => {
  return (
    <div>
      <DetailProduk pengguna={props.pengguna} />
    </div>
  );
};

export default DetailProduct;
