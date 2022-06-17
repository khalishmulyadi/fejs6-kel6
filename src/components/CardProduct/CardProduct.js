import React from "react";
import productImage from "../../img/produk.png";

// css
import "./CardProduct.css";

const CardProduct = () => {
  return (
    <div>
      <a href="product/product-detail" className="card_product">
        <div class="card p-2 m-3">
          <img src={productImage} class="card-img-top product_image" alt="product_image" />
          <div class="card-body">
            <h5 class="card-title">Jam Tangan Bagus</h5>
            <h6 class="card-subtitle mb-2 text-muted">Aksesoris</h6>
            <p class="card-text">Rp. 250.000</p>
          </div>
        </div>
      </a>
    </div>
  );
};

export default CardProduct;
