import React, { useEffect, useState } from "react";
import "./DetailProduk.css";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";

const DetailProduk = ({ pengguna, ...props }) => {
  var axios = require("axios");
  const [menawar, setMenawar] = useState(false);
  const [alertTawar, setAlertTawar] = useState(false);
  const [hargaTawar, setHargaTawar] = useState(0);
  const [DataBarang, setDataBarang] = useState([]);
  const [wishlist, setWishlist] = useState(JSON.parse(sessionStorage.getItem(`wishlist_${props.userId}`)));
  const [currentWishlist, setCurrentWishlist] = useState([]);

  if (JSON.parse(sessionStorage.getItem(`wishlist_${props.userId}`)) === null) {
    sessionStorage.setItem(`wishlist_${props.userId}`, "[]");
  }

  const { idBarang } = useParams();

  const token = JSON.parse(sessionStorage.getItem("user"));

  // ******* Handle Menawar *******
  const handleTawar = (e) => {
    e.preventDefault();

    if (props.dataUser.alamat !== null && props.dataUser.noTelepon !== null && props.dataUser.img !== null) {
      setMenawar(true);
      setAlertTawar(true);
      console.log(hargaTawar);
      console.log(menawar);

      // send API
      var FormData = require("form-data");
      var data = new FormData();
      data.append("hargaTawar", hargaTawar);

      var config = {
        method: "put",
        url: `https://asix-store.herokuapp.com/barang/tawar/${idBarang}`,
        headers: {
          Authorization: `Bearer ${token.access_token}`,
          // ...data.getHeaders()
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          alert("Silahkan login dulu");
          window.location.replace("/auth/login");
        });
    } else {
      alert("Mohon lengkapi data profile terlebih dahulu");
    }
  };

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

  // ****** Get Data Wishlist *******
  useEffect(() => {
    const storedWishlist = JSON.parse(sessionStorage.getItem(`wishlist_${props.userId}`));

    if (storedWishlist.length > 0) {
      setWishlist(storedWishlist);
    }
  }, [DataBarang]);

  // ******* Handle Add to Wishlist *******
  const handleWishlist = () => {
    if (props.loginStatus) {
      if (props.roleUser === 1) {
        console.log(DataBarang);
        setWishlist([DataBarang, ...wishlist]);
        alert("Barang berhasil dimasukkan ke wishlist");
      } else {
        alert("Hanya buyer yang bisa menambahkan");
      }
    } else {
      alert("Silahkan login terlebih dahulu");
      window.location.replace("/auth/login");
    }
  };

  // menyimpan wishlist di sessionStorage
  useEffect(() => {
    sessionStorage.setItem(`wishlist_${props.userId}`, JSON.stringify(wishlist));
    setCurrentWishlist(wishlist?.filter((e) => e.barangId === DataBarang.barangId));
  }, [wishlist]);

  const delHandler = (barangIdWishlist) => {
    const updatedWishlist = wishlist?.filter((item) => item.barangId !== barangIdWishlist);

    setWishlist(updatedWishlist);
    alert("Barang berhasil dihapus dari wishlist");
    // console.log(updatedWishlist);
  };

  return (

    <div className="container">

      <div className="navbar_product_detail">
        <NavbarDefault />
      </div>
      
      {alertTawar ? (
        <div className="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="d-flex">
            <div className="toast-body">Harga tawarmu berhasil dikirim ke penjual!</div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      ) : null}

      <div>
        <div className="container mx-auto detail_produk">
          <div>
            {props.loginStatus ? (
              <a className="back_icon" href="/homepage">
                <i className="bi bi-arrow-left-short"></i>
              </a>
            ) : (
              <a className="back_icon" href="/">
                <i className="bi bi-arrow-left-short"></i>
              </a>
            )}
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

          </div>
          <div className="col-sm-6">
            {/* detail produk */}
            <div className="container mt-5 py-3 product_detail">
              <h3>{DataBarang.namaBarang}</h3>
              <p>{DataBarang.tipeBarang}</p>
              <p>{formatRupiah(DataBarang.hargaBarang)}</p>

              {pengguna === "merchant" && (
                <div className="d-grid gap-2">
                  {/* <button type="button" className="btn btn_publish">

                    Terbitkan
                  </button> */}
                    <button type="button" className="btn btn_edit">
                      Edit
                    </button>
                  </div>
                )}

                {pengguna === "customer" && (
                  <div className="d-grid gap-2">
                    {menawar ? (
                      <button type="button" className="btn btn-secondary rounded-pill" disabled>
                        Menunggu Respon Penjual
                      </button>
                    ) : (
                      <div className="d-grid gap-2">
                        <button type="button" className="btn btn_publish" data-bs-toggle="modal" data-bs-target="#modalTawar">
                          Saya tertarik dan ingin nego
                        </button>

                        {currentWishlist.length > 0 ? (
                          <button type="button" className="btn btn_edit" onClick={() => delHandler(DataBarang.barangId)}>
                            Hapus dari wishlist
                          </button>
                        ) : (
                          <button type="button" className="btn btn_edit" onClick={handleWishlist}>
                            Tambahkan ke wishlist
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
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

                <form onSubmit={handleTawar}>
                  <div className="mb-3">
                    <label htmlFor="recipient-name" className="col-form-label">
                      Harga tawar
                    </label>
                    <input type="text" placeholder="Rp. 0,00" className="form-control form_harga_tawar" id="recipient-name" onChange={(e) => setHargaTawar(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn_kirim_tawaran w-100" data-bs-dismiss="modal">
                    Kirim
                  </button>
                </form>
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

export default connect(mapStateToProps)(DetailProduk);
