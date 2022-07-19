import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Card } from "react-bootstrap";
import CardProduct from "../CardProduct/CardProduct";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import "./DaftarBeliDesktop.css";
import seller from "../../img/Rectangle 33.png";
import cevhron_right from "../../img/fi_chevron-right.png";
import none from "../../img/undraw_selection_re_ycpo 1.png";
import { connect } from "react-redux";

const DaftarBeliDesktop = (props) => {
  const [tabActive, setTabActive] = useState(1);
  const [dataTawaran, setDataTawaran] = useState([]);
  const [dataWishlist, setDataWishlist] = useState([]);
  const [dataRiwayatBeli, setDataRiwayatBeli] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const getDataPembelian = (userId, statusBarang) => {
    var axios = require("axios");

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
          setDataTawaran(response?.data);
        } else if (statusBarang === "Sold") {
          setDataRiwayatBeli(response?.data);
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
      const storedWishlist = JSON.parse(sessionStorage.getItem(`wishlist_${props.idUser}`));

      if (storedWishlist !== []) {
        setDataWishlist(storedWishlist);
      }
    } else {
      setLoading(false);
    }
  }, [props.loginStatus]);

  const carDefault = () => {
    return dataTawaran?.length > 0 ? (
      <div className="container">
        <div className="row">
          {dataTawaran?.map((value, index) => {
            return (
              <div className="col-6" key={index}>
                <CardProduct
                  key={index}
                  namaBarang={value.namaBarang}
                  img={value.gambarBarang}
                  tipebarang={value.tipeBarang}
                  price={value.hargaBarang}
                  ToDetailProduct={value.barangId}
                  redirect={`/product/product-detail/${value.barangId}`}
                  btnCaption="Cek Status"
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="container-card-button2-daftarjualdesktop">
        <div>
          <img alt="" src={none} />
        </div>

        <div className="txt-produk-diminati-daftarjualdesktop">Kamu belum membeli apapun, yuk belanja sekarang!</div>
      </div>
    );
  };

  const carDefaultdua = () => {
    return dataWishlist?.length > 0 ? (
      <div className="container">
        <div className="row">
          {dataWishlist?.map((value, index) => {
            return (
              <div className="col-6" key={index}>
                <CardProduct
                  key={index}
                  namaBarang={value.namaBarang}
                  img={value.barangImg}
                  tipebarang={value.tipeBarang}
                  price={value.hargaBarang}
                  ToDetailProduct={value.barangId}
                  redirect={`/product/product-detail/${value.barangId}`}
                  btnCaption="Tertarik"
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="container-card-button2-daftarjualdesktop">
        <div>
          <img alt="" src={none} />
        </div>

        <div className="txt-produk-diminati-daftarjualdesktop">Wishlist kamu kosong nih, ayo browsing lebih banyak</div>
      </div>
    );
  };

  const carDefaulttiga = () => {
    return dataRiwayatBeli?.length > 0 ? (
      <div className="container">
        <div className="row">
          {dataRiwayatBeli?.map((value, index) => {
            return (
              <div className="col-6" key={index}>
                <CardProduct
                  key={index}
                  namaBarang={value.namaBarang}
                  img={value.gambarBarang}
                  tipebarang={value.tipeBarang}
                  price={value.hargaBarang}
                  ToDetailProduct={value.barangId}
                  redirect={`/product/product-detail/${value.barangId}`}
                  isDisabled={true}
                  btnCaption="Sudah Dibeli"
                />
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      <div className="container-card-button2-daftarjualdesktop">
        <div>
          <img alt="" src={none} />
        </div>

        <div className="txt-produk-diminati-daftarjualdesktop">Kamu belum membeli apapun, yuk belanja sekarang!</div>
      </div>
    );
  };

  const handleContentCard = () => {
    if (tabActive === 1) {
      return carDefault();
    } else if (tabActive === 2) {
      return carDefaultdua();
    } else if (tabActive === 3) {
      return carDefaulttiga();
    }
  };

  return (
    <div>
      {props.loginStatus === undefined ? (
        <div className="mx-auto">
          <h1 className="text-center">Loading...</h1>
        </div>
      ) : (
        <Container fluid className="px-0">
          <NavbarDefault />

          <Container className="container-content-daftarjualdesktop">
            <Row>
              <Col xs={12}>
                <strong> Daftar Beli Saya</strong>
              </Col>
            </Row>

            {/* card nama penjual */}
            <Row>
              <Col xs={12}>
                <Card className="card-daftarjualdesktop">
                  <div className="container-content-card-daftarjualdesktop">
                    <div className="container-img-txt-daftarjualdesktop">
                      <div className="container-img-daftarjuadesktop">
                        <img alt="" src={`data:image/png;base64,${props.dataUser.img}`} className="img-penjual-dafarjualdesktop" />
                      </div>

                      <div className="txt-daftarjualdesktop">
                        <strong>{props.dataUser.nama} </strong>
                        <p>{props.dataUser.kota}</p>
                      </div>
                    </div>

                    <div className="container-button-daftarjualdesktop">
                      <a type="button" href="/update-profile" className="edit-button-daftarbelidesktop">
                        Edit
                      </a>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col xs={4}>
                <Card className="card-kategori-daftarjualdesktop">
                  <div className="content-card-kategori-daftarjualdesktop">
                    <strong> Kategori</strong>
                    <button
                      onClick={() => {
                        setTabActive(1);
                      }}
                      className={`button-kategori-produk-daftarjual ${tabActive === 1 && "active"}`}
                    >
                      <div className="container-content-button-daftarjual">
                        <i className="bi bi-box"></i>
                        <p className={`txt-kategori-daftarjualdesktop ${tabActive === 1 && "active"}`}> Menunggu Respon Penjual</p>
                      </div>

                      <i className="bi bi-chevron-right"></i>
                    </button>

                    <hr />
                    <button
                      onClick={() => {
                        setTabActive(2);
                      }}
                      className={`button-kategori-produk-daftarjual ${tabActive === 2 && "active"}`}
                    >
                      <div className="container-content-button-daftarjual ">
                        {/* <img alt="" src={heart} /> */}
                        <i className="bi bi-heart"></i>
                        <p className={`txt-kategori-daftarjualdesktop ${tabActive === 2 && "active"}`}>Wishlist Saya</p>
                      </div>

                      <i className="bi bi-chevron-right"></i>
                    </button>

                    <hr />

                    <button
                      onClick={() => {
                        setTabActive(3);
                      }}
                      className={`button-kategori-produk-daftarjual ${tabActive === 3 && "active"}`}
                    >
                      <div className="container-content-button-daftarjual">
                        {/* <img alt="" src={dollar} /> */}
                        <i className="bi bi-currency-dollar"></i>
                        <p className={`txt-kategori-daftarjualdesktop ${tabActive === 3 && "active"}`}>Riwayat Pembelian</p>
                      </div>

                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </Card>
              </Col>

              <Col xs={8}>{handleContentCard()}</Col>
            </Row>
          </Container>
        </Container>
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

export default connect(mapStateToProps)(DaftarBeliDesktop);
