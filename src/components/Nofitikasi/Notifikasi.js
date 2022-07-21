import React from "react";

import productImg from "../../img/produk.png";

import "./Notifikasi.css";

const Notifikasi = (props) => {
  // Format Rupiah
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
      let separator = remainder ? '.' : '';
      rupiah += separator + thousand.join('.');
    }

    // Display output
    return `Rp ${rupiah}`;
  };

  return (
    <div>
      <div className="notifikasi">
        <div className="row">
          <div className="col-2">
            <img src={`data:image/png;base64,${props.img}`} className="gambar_produk_notif" alt="gambar_produk" />
          </div>
          <div className="col-10">
            <div className="container-content-notifikasi">
              <div className="container-date-notifikasi">
                <p className="status_notifikasi mb-0">Penawaran produk</p>
                <p className="waktu_notifikasi">{props.date}</p>

              </div>
              <p className="mb-0">{props.namaProduk}</p>
              <p className="mb-0">{formatRupiah(props.harga)}</p>
              <p className="mb-0">Ditawar {formatRupiah(props.hargaTawar)}</p>
              <p className="waktu_notifikasi-mobile">{props.date}</p>

            </div>

          </div>

        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default Notifikasi;
