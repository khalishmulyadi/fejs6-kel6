import React from "react";
import productImage from "../../img/produk.png";

// css
import "./CardProduct.css";

const CardProduct = () => {
  return (
    <div>
      <a href="product/product-detail" className="card_product">
        <div className="card p-2 m-3">
          <img src={productImage} className="card-img-top product_image" alt="product_image" />
          <div className="card-body">
            <h5 className="card-title">Jam Tangan Bagus</h5>
            <h6 className="card-subtitle mb-2 text-muted">Aksesoris</h6>
            <p className="card-text">Rp. 250.000</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardProduct;
