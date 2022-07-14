import React, { useState, useEffect } from "react";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import CardProduct from "../CardProduct/CardProduct";
import kosongPeminat from "../../img/undraw_selection_re_ycpo 1.png";

// css
import "./DaftarBeliMobile.css";

// redux
import { connect } from "react-redux";

const DaftarBeliMobile = (props) => {
  const [tabActive, setTabActive] = useState(1);
  const [dataTawaran, setDataTawaran] = useState([]);
  const [dataWishlist, setDataWishlist] = useState([]);
  const [dataRiwayatBeli, setDataRiwayatBeli] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataPembelian = (userId, statusBarang) => {
    var axios = require("axios");

    const user = JSON.parse(sessionStorage.getItem("user"));

    var config = {
      method: "get",
      url: `https://asix-store.herokuapp.com/daftar-beli/${userId}/${statusBarang}`,
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        if (statusBarang === "Bidding") {
          setDataTawaran(response.data);
        } else if (statusBarang === "Sold") {
          setDataRiwayatBeli(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    if (loading === false) {
      getDataPembelian(props.idUser, "Bidding");
      getDataPembelian(props.idUser, "Sold");
      if (JSON.parse(sessionStorage.getItem(`wishlist_${props.idUser}`)) === null) {
        sessionStorage.setItem(`wishlist_${props.idUser}`, "[]");
      } else {
        const storedWishlist = JSON.parse(sessionStorage.getItem(`wishlist_${props.idUser}`));
        if (storedWishlist !== []) {
          setDataWishlist(storedWishlist);
        }
      }
    } else {
      setLoading(false);
    }
  }, [props.loginStatus]);

  return (
    <div>
      <NavbarDefault title={"Daftar Beli"} />
      {props.loginStatus == undefined ? (
        <div className="mx-auto">
          <h1 className="text-center">Loading...</h1>
        </div>
      ) : (
        <div>
          {/* Profil penjual dan edit start*/}
          <div className="container mt-3 py-3 shadow seller_detail">
            <div className="row align-items-center">
              <div className="col-3">
                <img src={`data:image/png;base64,${props.dataUser.img}`} className="img_penjual" alt="foto_penjual" />
              </div>
              <div className="col-6">
                <h3>{props.dataUser.nama}</h3>
                <p>{props.dataUser.kota}</p>
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

          {tabActive === 1 &&
            (dataTawaran.length > 0 ? (
              <div className="container">
                <div className="row row-cols-2">
                  {dataTawaran.map((value, index) => {
                    return (
                      <div className="col" key={index}>
                        <CardProduct
                          key={index}
                          namaBarang={value.namaBarang}
                          img={value.barangImg}
                          tipebarang={value.tipeBarang}
                          price={value.hargaBarang}
                          ToDetailProduct={value.barangId}
                          redirect={`/product/product-detail/${value.barangId}`}
                        />
                        ;
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <img src={kosongPeminat} className="kosong_peminat" alt="kosong_peminat" />
                <p className="text-center fw-bold">Kamu belum belanja apapun, yuk mulai belanja!</p>
              </div>
            ))}

          {/* content produk end */}

          {/* content diminati start */}

          {tabActive === 2 &&
            (dataWishlist.length > 0 ? (
              <div className="container">
                <div className="row row-cols-2">
                  {dataWishlist.map((value, index) => {
                    return (
                      <div className="col" key={index}>
                        <CardProduct
                          key={index}
                          namaBarang={value.namaBarang}
                          img={value.barangImg}
                          tipebarang={value.tipeBarang}
                          price={value.hargaBarang}
                          ToDetailProduct={value.barangId}
                          redirect={`/product/product-detail/${value.barangId}`}
                        />
                        ;
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <img src={kosongPeminat} className="kosong_peminat" alt="kosong_peminat" />
                <p className="text-center fw-bold">Kamu belum belanja apapun, yuk mulai belanja!</p>
              </div>
            ))}

          {/* content diminati end */}

          {/* content terjual start */}

          {tabActive === 3 &&
            (dataRiwayatBeli.length > 0 ? (
              <div className="container">
                <div className="row row-cols-2">
                  {dataRiwayatBeli.map((value, index) => {
                    return (
                      <div className="col" key={index}>
                        <CardProduct
                          key={index}
                          namaBarang={value.namaBarang}
                          img={value.barangImg}
                          tipebarang={value.tipeBarang}
                          price={value.hargaBarang}
                          ToDetailProduct={value.barangId}
                          redirect={`/product/product-detail/${value.barangId}`}
                        />
                        ;
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div>
                <img src={kosongPeminat} className="kosong_peminat" alt="kosong_peminat" />
                <p className="text-center fw-bold">Kamu belum belanja apapun, yuk mulai belanja!</p>
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

export default connect(mapStateToProps)(DaftarBeliMobile);
