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
import Banner from "../../img/img banner.png";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import getUserDetail from "../../redux/actions/getUserDetail";

const HomePage = (props) => {
  var axios = require("axios");
  const [Barang, setBarang] = useState([]);
  const [filterActive, setfilterActive] = useState(1);

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

  const handleCardProduct = () => {
    const filterBarang = Barang.filter((barang) => {
      return barang.statusBarang === "Availabel";
    });

    return filterBarang.map((value, index) => {
      if (props.loginStatus === true) {
        return (
          <div className="col-md-3 col-6" key={index}>
            <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} redirect={`product/product-detail/${value.barangId}`} />
          </div>
        );
      } else {
        return (
          <div className="col-md-3 col-6" key={index}>
            <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} ToDetailProduct={value.barangId} redirect={`product/product-detail/p/${value.barangId}`} />
          </div>
        );
      }
    });
  };

  const filterResult = () => {
    var axios = require("axios");
    var data = "{\r\n    \r\n}";

    var config = {
      method: "get",
      url: "https://asix-store.herokuapp.com/barang",
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log("berhasil");
        setBarang(response.data);
        setfilterActive(1);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const filterResultAksesoris = () => {
    var axios = require("axios");
    var data = "{\r\n    \r\n}";

    var config = {
      method: "get",
      url: "https://asix-store.herokuapp.com/barang/Aksesoris",
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log("berhasil");
        setBarang(response.data);
        setfilterActive(3);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const filterResultGitar = () => {
    var axios = require("axios");
    var data = "{\r\n    \r\n}";

    var config = {
      method: "get",
      url: "https://asix-store.herokuapp.com/barang/Gitar",
      headers: {},
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log("berhasil");
        setBarang(response.data);
        setfilterActive(2);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleKontenFilter = () => {
    if (filterActive === 1) {
      return filterResult();
    } else if (filterActive === 2) {
      return filterResultGitar();
    } else if (filterActive === 3) {
      return filterResultAksesoris();
    }
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
                  <img src={swiper1} className="card-img-side" alt="carousel-1"></img>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card swiper-card">
                  <img src={swiper2} className="card-img-side" alt="carousel-2"></img>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="card swiper-card">
                  <img src={swiper3} className="card-img-side" alt="carousel-3"></img>
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

        <div className="row">
          <div className="button_filters col-12 col-md-6 mb-0">
            <button className={`btn button_filter me-2 ${filterActive === 1 && "active-btn"}`} onClick={() => filterResult()}>
              <i className="bi bi-search"></i> Semua
            </button>
            <button type="button" className={`btn button_filter me-2 ${filterActive === 2 && "active-btn"}`} onClick={() => filterResultGitar()}>
              <i className="bi bi-search"></i> Gitar
            </button>
            <button type="button" className={`btn button_filter me-2 ${filterActive === 3 && "active-btn"}`} onClick={() => filterResultAksesoris()}>
              <i className="bi bi-search"></i> Aksesoris
            </button>
          </div>

          {/* form search */}
          <div className="col-12 col-md-6 mt-md-0 mt-3">
            <form className="d-flex">
              <div className="input-group search_bar">
                <input className="form-control search_input" type="search" placeholder="Cari di sini..." aria-label="Search" aria-describedby="button-addon2" />
                <button className="btn search_button" id="button-addon2" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="konten row">{handleCardProduct()}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
    dataProduk: state.productReducer.dataProduk,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
