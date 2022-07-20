import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// import productImage from "../../img/produk.png";

// css
import "./CardProduct.css";

const CardProduct = ({ namaBarang, img, tipebarang, price, ToDetailProduct, loginStatus, redirect, isDisabled, btnCaption }) => {
  const navigate = useNavigate();

  const formatRupiah = (value) => {
    if (!value || value == null) return `Rp 0`;
    // Convert value to string
    let newValue = value.toString();

    // Modulus operator to get division remainder
    let remainder = newValue.length % 3;

    // Substract value based on the remainder value
    let rupiah = newValue.substr(0, remainder);

    // Substract value based on the remainder and split it into array that match 3 digit
    let thousand = newValue.substr(remainder).match(/\d{3}/g);

    // Append all string
    if (thousand) {
      let separator = remainder ? "." : "";
      rupiah += separator + thousand.join(".");
    }

    // Display output
    return `Rp ${rupiah}`;
  };

  return (
    <div className={`card_product ${isDisabled ? "disabled" : ""}`}>
      <div className="card card_product p-2 m-3">
        <img src={`data:image/jpeg;base64,${img}`} className="card-img-top product_image" alt="product_image" />
        <div className="body-card">
          <h6 className="card-title">{namaBarang}</h6>
          <p className="card-subtitle mb-2 text-muted">{tipebarang}</p>
          <h6 className="card-text">{formatRupiah(price)}</h6>

          <div className="tertarik-buy">
            <a href={redirect} className={`card_button d-block text-center px-2 py-2 ${isDisabled ? "disabled" : ""}`}>
              {btnCaption}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps)(CardProduct);
