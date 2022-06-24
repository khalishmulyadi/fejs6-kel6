import React, { useState } from "react";
import  { useNavigate } from "react-router";
import { Container, Row, Col, Card } from "react-bootstrap";
import NavbarDesktop from "../NavbarDefault/NavbarDesktop";
import './DaftarjualDesktop.css'
import seller from '../../img/Rectangle 33.png'
import cevhron_right from '../../img/fi_chevron-right.png'
import CardProduct from '../CardProduct/CardProduct'
import none from '../../img/undraw_selection_re_ycpo 1.png'

const DaftarJualDesktop = () => {
  const [first, setfirst] = useState(1)
  const navigate = useNavigate();

  const carDefault = () => {
    return <div className="container-card-daftarjualdesktop">
      <div className="container-btn-add-product-daftarjualdesktop">
        <button onClick={()=>{handleAddProduct()}} className="btn-add-product-daftarjualdesktop">
          <i class="bi bi-plus-lg"></i>
          <label>Tambah Produk</label>
        </button>
      </div>
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
      <CardProduct />
    </div>
  }
  const carDefaultdua = () => {
    return <div className="container-card-button2-daftarjualdesktop">
      <div>
        <img alt="" src={none} />
      </div>

      <div className="txt-produk-diminati-daftarjualdesktop">Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok</div>
    </div>
  }
  const carDefaulttiga = () => {
    return <div className="container-card-button2-daftarjualdesktop">
      <div>
        <img alt="" src={none} />
      </div>

      <div className="txt-produk-diminati-daftarjualdesktop">Belum ada produkmu yang diminati nih, sabar ya rejeki nggak kemana kok</div>
    </div>
  }




  const handleContentCard = () => {
    if (first == 1) {
      return carDefault()
    } else if (first == 2) {
      return carDefaultdua()
    } else if (first == 3) {
      return carDefaulttiga()
    }
  }

  const handleAddProduct = () =>{
    navigate('/tambah-product')
  }


  return (
    <div>
      <Container fluid>
        <NavbarDesktop />

        <Container className="container-content-daftarjualdesktop">
          <Row>
            <Col xs={12}>
              <strong> Daftar Jual Saya</strong>
            </Col>
          </Row>

          {/* card nama penjual */}
          <Row>
            <Col xs={12}>
              <Card className="card-daftarjualdesktop">
                <div className="container-content-card-daftarjualdesktop">
                  <div className="container-img-txt-daftarjualdesktop">

                    <div className="container-img-daftarjuadesktop">
                      <img alt="" src={seller} className="img-penjual-dafarjualdesktop" />
                    </div>

                    <div className="txt-daftarjualdesktop">
                      <strong> Nama Penjual</strong>
                      <p>Kota</p>
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

                  <button onClick={() => {
                    setfirst(1)
                  }} className="button-kategori-produk-daftarjual" >
                    <div className="container-content-button-daftarjual">
                      {/* <img alt="" src={produk} /> */}
                      <i class="bi bi-box"></i>
                      <p className="txt-kategori-daftarjualdesktop"> Semua Produk</p>

                    </div>

                    <img alt="" src={cevhron_right} />
                  </button>

                  <hr />

                  <button onClick={() => {
                    setfirst(2)
                  }} className="button-kategori-produk-daftarjual">
                    <div className="container-content-button-daftarjual">
                      {/* <img alt="" src={heart} /> */}
                      <i class="bi bi-heart"></i>
                      <p className="txt-kategori-daftarjualdesktop">Diminati</p>

                    </div>

                    <img alt="" src={cevhron_right} />
                  </button>

                  <hr />

                  <button onClick={() => { setfirst(3) }} className="button-kategori-produk-daftarjual">
                    <div className="container-content-button-daftarjual">
                      {/* <img alt="" src={dollar} /> */}
                      <i class="bi bi-currency-dollar"></i>
                      <p className="txt-kategori-daftarjualdesktop">Terjual</p>

                    </div>

                    <img alt="" src={cevhron_right} />
                  </button>

                </div>
              </Card>
            </Col>

            <Col xs={8}>
              {handleContentCard()}

            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default DaftarJualDesktop;
