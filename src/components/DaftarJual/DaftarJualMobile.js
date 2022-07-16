import React, { useState, useEffect } from "react";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import CardProduct from "../CardProduct/CardProduct";

import tambahProduk from "../../img/tambah_produk.png";
import kosongPeminat from "../../img/undraw_selection_re_ycpo 1.png";

// css
import "./DaftarJualMobile.css";
import { connect } from "react-redux";

const DaftarJualMobile = (props) => {
  const [tabActive, setTabActive] = useState(1);
  const [dataJualan, setDataJualan] = useState([]);
  const [dataDiminati, setDataDiminati] = useState([]);
  const [dataTerjual, setDataTerjual] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataPenjualan = (userId, statusBarang) => {
    var axios = require("axios");

    const user = JSON.parse(sessionStorage.getItem("user"));

    var config = {
      method: "get",
      url: `https://asix-store.herokuapp.com/daftar-jual/${userId}/${statusBarang}`,
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (statusBarang === 1) {
          setDataJualan(response?.data);
        } else if (statusBarang === 2) {
          setDataDiminati(response?.data);
        } else if (statusBarang === 3) {
          setDataTerjual(response?.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (loading === false) {
      getDataPenjualan(props?.idUser, 1);
      getDataPenjualan(props?.idUser, 2);
      getDataPenjualan(props?.idUser, 3);
    } else {
      setLoading(false);
    }
  }, [props.loginStatus]);

  return (
    <div>
      <NavbarDefault title={"Daftar Jual"} />
      {props.loginStatus == undefined ? (
        <div className="mx-auto">
          <h1 className="text-center">Loading...</h1>
        </div>
      ) : (
        <div className="daftarJual__mobile">
          {/* Profil penjual dan edit start*/}
          <div className="container mt-3 py-3 shadow seller_detail">
            <div className="row align-items-center">
              <div className="col-3">
                <img src={`data:image/png;base64,${props.dataUser.img}`} className="img_penjual" alt="foto_penjual" />
              </div>
              <div className="col-6">
                <h5>{props?.dataUser?.nama}</h5>
                <p>{props?.dataUser?.kota}</p>
              </div>
              <div className="col-3">
                <a href="/update-profile" className="btn btn_edit_profil_daftar_jual">
                  Edit
                </a>
              </div>
            </div>
          </div>
          {/* Profil penjual dan edit end */}

          {/* button tab start */}
          <div className="btn_tab_daftar_jual_mobile container mt-4">
            <button className={`btn btn_tab_produk btn-lg mx-3 ${tabActive === 1 && "active"}`} onClick={(e) => setTabActive(1)}>
              <span className="me-2">
                <i className="bi bi-box"></i>
              </span>
              Produk
            </button>

            <button className={`btn btn_tab_diminati btn-lg mx-3 ${tabActive === 2 && "active"}`} onClick={(e) => setTabActive(2)}>
              <span className="me-2">
                <i className="bi bi-heart"></i>
              </span>
              Diminati
            </button>

            <button className={`btn btn_tab_terjual btn-lg mx-3 ${tabActive === 3 && "active"}`} onClick={(e) => setTabActive(3)}>
              <span className="me-2">
                <i className="bi bi-currency-dollar"></i>
              </span>
              Terjual
            </button>
          </div>
          {/* button tab end */}

          {/* content start */}

          {/* content produk start */}

          {tabActive === 1 && (
            <div className="container">
              <div className="row row-cols-2">
                <a href="/tambah-product">
                  <img src={tambahProduk} className="btn_tambah_produk col" alt="tambah_produk" />
                </a>

                {dataJualan?.map((value, index) => {
                  return (
                    <div className="col" key={index}>
                      <CardProduct
                        key={index}
                        namaBarang={value.namaBarang}
                        img={value.barangImg}
                        tipebarang={value.tipeBarang}
                        price={value.hargaBarang}
                        ToDetailProduct={value.barangId}
                        redirect={`/product/my-product/${value.barangId}`}
                      />
                      ;
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* content produk end */}

          {/* content diminati start */}

          {tabActive === 2 &&
            (dataDiminati?.length > 0 ? (
              <div className="container">
                <div className="row row-cols-2">
                  {dataDiminati.map((value, index) => {
                    return (
                      <div className="col">
                        <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} />;
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <img src={kosongPeminat} className="kosong_peminat" alt="kosong_peminat" />
                <p className="text-center fw-bold">Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok</p>
              </div>
            ))}

          {/* content diminati end */}

          {/* content terjual start */}

          {tabActive === 3 &&
            (dataTerjual?.length > 0 ? (
              <div className="container">
                <div className="row row-cols-2">
                  {dataTerjual.map((value, index) => {
                    return (
                      <div className="col">
                        <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} />;
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <img src={kosongPeminat} className="kosong_peminat" alt="kosong_peminat" />
                <p className="text-center fw-bold">Belum ada produkmu yang terjual nih, sabar ya rejeki nggak kemana kok</p>
              </div>
            ))}

          {/* content terjual end */}

          {/* content end */}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataUser: state.userReducer.dataUser,
    loginStatus: state.userReducer.isLoggedIn,
    idUser: state.userReducer.idUser,
    role: state.userReducer.role,
  };
};

export default connect(mapStateToProps)(DaftarJualMobile);
