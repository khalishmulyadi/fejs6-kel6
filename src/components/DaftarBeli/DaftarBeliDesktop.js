import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Container, Row, Col, Card } from "react-bootstrap";
import CardProduct from "../CardProduct/CardProduct";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import "./DaftarjualDesktop.css";
import seller from "../../img/Rectangle 33.png";
import cevhron_right from "../../img/fi_chevron-right.png";
import none from "../../img/undraw_selection_re_ycpo 1.png";
import { connect } from "react-redux";

const DaftarBeliDesktop = (props) => {
  const [tabActive, setTabActive] = useState(1);
  const [dataTransaksi1, setDataTransaksi1] = useState([]);
  const [dataTransaksi2, setDataTransaksi2] = useState([]);
  const [dataTransaksi3, setDataTransaksi3] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("user"));

  const getDataTransaksi = (userId, statusBarang) => {
    var axios = require("axios");

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
          setDataTransaksi1(response.data);
        } else if (statusBarang === 2) {
          setDataTransaksi2(response.data);
        } else if (statusBarang === 3) {
          setDataTransaksi3(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getDataTransaksi(props.idUser, 1);
    getDataTransaksi(props.idUser, 2);
    getDataTransaksi(props.idUser, 3);
  }, [props.loginStatus]);

  const carDefault = () => {
    return (
      <div className="container-card-daftarjualdesktop">
        <div className="container-btn-add-product-daftarjualdesktop">
          {props.role === 2 ? (
            <a href="/tambah-produk" className="btn-add-product-daftarjualdesktop">
              <i className="bi bi-plus-lg"></i>
              <label>Tambah Produk</label>
            </a>
          ) : null}

          {dataTransaksi1.map((value, index) => {
            return <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} />;
          })}
        </div>
      </div>
    );
  };

  const carDefaultdua = () => {
    return dataTransaksi2 === [] ? (
      dataTransaksi2.map((value, index) => {
        return <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} />;
      })
    ) : (
      <div className="container-card-button2-daftarjualdesktop">
        <div>
          <img alt="" src={none} />
        </div>

        <div className="txt-produk-diminati-daftarjualdesktop">Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok</div>
      </div>
    );
  };

  const carDefaulttiga = () => {
    return dataTransaksi3 === [] ? (
      dataTransaksi2.map((value, index) => {
        return <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} />;
      })
    ) : (
      <div className="container-card-button2-daftarjualdesktop">
        <div>
          <img alt="" src={none} />
        </div>

        <div className="txt-produk-diminati-daftarjualdesktop">Belum ada produkmu yang terjual nih, sabar ya rejeki nggak kemana kok</div>
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
      {props.loginStatus !== undefined ? (
        <div className="mx-auto">
          <h1 className="text-center">Loading...</h1>
        </div>
      ) : (
        <Container fluid>
          <NavbarDefault />

          <Container className="container-content-daftarjualdesktop">
            <Row>
              <Col xs={12}>{props.role === 2 ? <strong> Daftar Jual Saya</strong> : <strong> Daftar Beli Saya</strong>}</Col>
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
                        {props.role === 2 ? <strong> {props.dataUser.nama}</strong> : <strong>{props.dataUser.nama} </strong>}
                        <p>{props.dataUser.kota}</p>
                      </div>
                    </div>

                    <div className="container-button-daftarjualdesktop">
                      <button className="edit-button-daftarjualdesktop">Edit</button>
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

                    {props.role === 2 ? (
                      <button
                        onClick={() => {
                          setTabActive(1);
                        }}
                        className="button-kategori-produk-daftarjual"
                      >
                        <div className="container-content-button-daftarjual">
                          <i className="bi bi-box"></i>
                          <p className="txt-kategori-daftarjualdesktop"> Semua Produk</p>
                        </div>

                        <img alt="" src={cevhron_right} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setTabActive(1);
                        }}
                        className="button-kategori-produk-daftarjual"
                      >
                        <div className="container-content-button-daftarjual">
                          <i className="bi bi-box"></i>
                          <p className="txt-kategori-daftarjualdesktop"> Menunggu Respon Penjual</p>
                        </div>

                        <img alt="" src={cevhron_right} />
                      </button>
                    )}

                    <hr />
                    {props.role === 2 ? (
                      <button
                        onClick={() => {
                          setTabActive(2);
                        }}
                        className="button-kategori-produk-daftarjual"
                      >
                        <div className="container-content-button-daftarjual">
                          {/* <img alt="" src={heart} /> */}
                          <i className="bi bi-heart"></i>
                          <p className="txt-kategori-daftarjualdesktop">Diminati</p>
                        </div>

                        <img alt="" src={cevhron_right} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setTabActive(2);
                        }}
                        className="button-kategori-produk-daftarjual"
                      >
                        <div className="container-content-button-daftarjual">
                          {/* <img alt="" src={heart} /> */}
                          <i className="bi bi-heart"></i>
                          <p className="txt-kategori-daftarjualdesktop">Wishlist Saya</p>
                        </div>

                        <img alt="" src={cevhron_right} />
                      </button>
                    )}

                    <hr />

                    {props.role === 2 ? (
                      <button
                        onClick={() => {
                          setTabActive(3);
                        }}
                        className="button-kategori-produk-daftarjual"
                      >
                        <div className="container-content-button-daftarjual">
                          {/* <img alt="" src={dollar} /> */}
                          <i className="bi bi-currency-dollar"></i>
                          <p className="txt-kategori-daftarjualdesktop">Terjual</p>
                        </div>

                        <img alt="" src={cevhron_right} />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setTabActive(3);
                        }}
                        className="button-kategori-produk-daftarjual"
                      >
                        <div className="container-content-button-daftarjual">
                          {/* <img alt="" src={dollar} /> */}
                          <i className="bi bi-currency-dollar"></i>
                          <p className="txt-kategori-daftarjualdesktop">Riwayat Pembelian</p>
                        </div>

                        <img alt="" src={cevhron_right} />
                      </button>
                    )}
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
