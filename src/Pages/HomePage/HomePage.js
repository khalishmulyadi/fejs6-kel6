import React, { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarDefault from "../../components/NavbarDefault/NavbarDefault";
import swiper1 from "../../img/banner1.png";
import swiper2 from "../../img/banner2.png";
import swiper3 from "../../img/banner3.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import getUserDetail from "../../redux/actions/getUserDetail";

const HomePage = (props) => {
  var axios = require("axios");
  const [Barang, setBarang] = useState([]);

  const slides = [];

  const navigate = useNavigate();

  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img src={swiper1} alt={`Slide ${i}`}></img>
        <img src={swiper2} alt={`Slide ${i}`}></img>
        <img src={swiper3} alt={`Slide ${i}`}></img>
      </SwiperSlide>
    );
  }

  useEffect(() => {
    var config = {
      method: "get",
      url: "https://asix-store.herokuapp.com/barang",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setBarang(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // props.getUserDetail();
    if (props.loginStatus === true) {
      navigate("/homepage");
    }
  }, [props.loginStatus]);

  const filterBarang = Barang.filter((barang) => {
    return barang.statusBarang === "Availabel";
  });

  const handleCardProduct = () => {
    const filterBarang = Barang.filter((barang) => {
      return barang.statusBarang === "Availabel";
    });

    return filterBarang.map((value, index) => {
      if (props.loginStatus === true) {
        return <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} redirect={`product/product-detail/${value.barangId}`} />;
      } else {
        return <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} redirect={`product/product-detail/p/${value.barangId}`} />;
      }
    });
  };

  return (
    <div className="container-fluid px-0">
      <div className="nav-custom">
        <NavbarDefault />
      </div>

      <div className="container section1">
      
        <div className="swiper-konten">
          <React.Fragment>
          <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="card swiper-card">
                  <img src={swiper1} className="card-img-side"></img>
                  {/* <div className="row swiper align-items-center">
                    <div className="text-swiper-konten col-lg-6">
                      <h3>NEW COLLECTION</h3>
                      <h5>Gitar Listrik</h5>
                      <p>Gitar listrik merupakan gitar yang dicolok ke listrik dan menggunakan listrik</p>
                      {/* <button type="button" className="btn btn-secondary me-2">PESAN SEKARANG</button> */}
                    </div>

                    {/* <div className="img-swiper-konten col-lg-6">
                      <img src={gitarSwiper} className="card-img-side" Style="width:100%;"/>
                    </div> */}
                  {/* </div>                   */}
                {/* </div> */}
              </SwiperSlide>
              <SwiperSlide>
              <div className="card swiper-card">
              <img src={swiper2} className="card-img-side"></img>
                  {/* <div className="row swiper align-items-center">
                    <div className="text-swiper-konten col-lg-6">
                      Slide 2
                    </div>
                    <div className="img-swiper-konten col-lg-6">
                      <img src={gitarSwiper} className="card-img-side" Style="width:100%;"/>
                    </div>
                  {/* </div>                   */}
                </div> 
              </SwiperSlide>
              <SwiperSlide>
              <div className="card swiper-card">
              <img src={swiper3} className="card-img-side"></img>
                  {/* <div className="row swiper align-items-center">
                    <div className="text-swiper-konten col-lg-6 col-sm-12">
                      Slide 3
                    </div>
                    <div className="img-swiper-konten col-lg-6">
                      <img src={gitarSwiper} className="card-img-side" Style="width:100%;"/>
                    </div>
                  </div>                   */}
                </div>
              </SwiperSlide>
            </Swiper>
          </React.Fragment>
        </div>
      </div>
      <div className="container section2">
        <p>
          <strong>Telurusi Kategori</strong>
        </p>

        <div className="button-homepage">
          <button type="button" className="btn button__filter me-2">
            <span className="me-2">
              <i className="bi bi-search"></i> 
            </span>
            Semua
          </button>
          <button type="button" className="btn button__filter me-2">
            <span className="me-2">
              <i className="bi bi-search"></i>
            </span> 
            Gitar
          </button>
          <button type="button" className="btn button__filter me-2">
            <span className="me-2">
              <i className="bi bi-search"></i>
            </span> 
            Aksesoris
          </button>
        </div>

        <div className="konten">{handleCardProduct()}</div>

      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
