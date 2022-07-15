import React, { useEffect, useState } from "react";
import "./DetailProduk.css";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const DetailEditSeller = ({ pengguna, ...props }) => {
  var axios = require("axios");
  const [DataBarang, setDataBarang] = useState([]);

  const { idBarang } = useParams();

  const token = JSON.parse(sessionStorage.getItem("user"));

  // ************* Get Data Barang By Id *************
  useEffect(() => {
    var config = {
      method: "get",
      url: `https://asix-store.herokuapp.com/detail-barang/${idBarang}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setDataBarang(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(DataBarang);
  }, []);

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
      let separator = remainder ? "." : "";
      rupiah += separator + thousand.join(".");
    }

    // Display output
    return `Rp ${rupiah}`;
  };

  const deleteBarang = () => {
    var config = {
      method: "delete",
      url: `https://asix-store.herokuapp.com/barang/delete/${idBarang}`,
      headers: {
        Authorization: `Bearer ${token.access_token} `,
      },
    };

    let confirmDelete = "Apakah kamu yakin mau menghapus barang ini?";

    if (props.roleUser === 2) {
      if (window.confirm(confirmDelete) === true) {
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            alert("Barang berhasil dihapus");
            window.location.replace("/daftar-jual");
          })
          .catch(function (error) {
            console.log(error);
            alert("Gagal menghapus barang");
          });
      }
    } else {
      alert("Hanya seller yang bisa menghapus!");
      window.location.replace("/homepage");
    }
  };

  return (
    <div>
      <div className="navbar_product_detail">
        <NavbarDefault />
      </div>

      <div className="container mx-auto detail_produk">
        <div>
          <a className="back_icon" href="/#">
            <i className="bi bi-arrow-left-short"></i>
          </a>
        </div>
        <div className="row">
          <div className="col-sm-6 p-0">
            {/* carousel gambar barang */}
            <div className="container p-0 mt-sm-5 ps-sm-3">
              <div id="carouselExampleIndicators" className="carousel slide" data-bs-touch="true" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={`data:image/png;base64,${DataBarang.barangImg}`} className="d-block w-100 carousel_img" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={`data:image/png;base64,${DataBarang.barangImg}`} className="d-block w-100 carousel_img" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={`data:image/png;base64,${DataBarang.barangImg}`} className="d-block w-100 carousel_img" alt="..." />
                  </div>
                </div>
                <button className="carousel-control-prev h-50 my-auto" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next h-50 my-auto" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            {/* detail produk */}
            <div className="container mt-5 py-3 shadow product_detail">
              <h3>{DataBarang.namaBarang}</h3>
              <p>{DataBarang.tipeBarang}</p>
              <p>{formatRupiah(DataBarang.hargaBarang)}</p>

              <div className="d-grid gap-2">
                <a href={`/update-barang/${DataBarang.barangId}`} className="btn btn_edit">
                  Edit
                </a>
                <button type="button" className="btn btn_publish" onClick={deleteBarang}>
                  Hapus Produk
                </button>
              </div>
            </div>

            {/* detail seller */}
            <div className="container mt-3 py-3 shadow seller_detail">
              <div className="row">
                <div className="col-3">
                  <img src={`data:image/png;base64,${DataBarang.profilePenjual}`} className="img_penjual" alt="foto_penjual" />
                </div>
                <div className="col ms-3 ms-sm-0">
                  <h3>{DataBarang.namaSeller}</h3>
                  <p>{DataBarang.kota}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* deskripsi produk */}
        <div className="container w-100 mt-5 mb-5 mx-auto px-4 py-3 shadow product_desc">
          <h3>Deskripsi</h3>
          <p>{DataBarang.deskripsi}</p>
          <ul>
            <li>Merk: {DataBarang.merk}</li>
            <li>Seri: {DataBarang.seri}</li>
          </ul>
        </div>
      </div>

      <div className="modal fade " id="modalTawar" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-light modal_tawar mx-auto">
            <div className="modal-header modal_head">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mt-4">
              <h5 className="modal-title" id="exampleModalLabel">
                Masukkan Harga Tawarmu
              </h5>
              <p style={{ color: "#8A8A8A" }}>Harga tawaranmu akan diketahui penual, jika penjual cocok kamu akan segera dihubungi penjual.</p>

              <div className="container product_detail_tawar py-3">
                <div className="row">
                  <div className="col-3">
                    <img src={`data:image/png;base64,${DataBarang.barangImg}`} className="product_img_tawar" alt="product-img-haggle" />
                  </div>
                  <div className="col-9">
                    <p className="mb-0 fw-bold">{DataBarang.namaBarang}</p>
                    <p className="mb-0">{formatRupiah(DataBarang.hargaBarang)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
    roleUser: state.userReducer.role,
    userId: state.userReducer.idUser,
    dataUser: state.userReducer.dataUser,
  };
};

export default connect(mapStateToProps)(DetailEditSeller);
