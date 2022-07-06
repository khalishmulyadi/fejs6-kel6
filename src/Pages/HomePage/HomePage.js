import React, { useEffect, useState } from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarDefault from "../../components/NavbarDefault/NavbarDefault";
import Banner from "../../img/img banner.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.css";
const HomePage = () => {
  var axios = require("axios");
  const [Barang, setBarang] = useState([]);

  const slides = [];

  for (let i = 0; i < 5; i += 1) {
    slides.push(
      <SwiperSlide key={`slide-${i}`}>
        <img src={Banner} alt={`Slide ${i}`}></img>
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
      .then(function(response) {
        console.log(response.data);
        setBarang(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  const handleCardProduct = () => {
    return Barang.map((value, index) => {
      return <CardProduct key={index} namaBarang={value.namaBarang} img={value.barangImg} tipebarang={value.tipeBarang} price={value.hargaBarang} />;
    });
  };

  return (
    <div className="container">
      <div className="nav-custom">
        <NavbarDefault />
      </div>
      <div className="container swiper-konten">
        <React.Fragment>
          <Swiper id="main" preloadImages slidesPerView={1} spaceBetween grabCursor mousewheel centeredSlides>
            {slides}
          </Swiper>
        </React.Fragment>
      </div>

      <div className="container section1">
        <div className="swiper-konten">
          <React.Fragment>
            <Swiper id="main" preloadImages slidesPerView={1} spaceBetween grabCursor mousewheel centeredSlides>
              {slides}
            </Swiper>
          </React.Fragment>
        </div>
      </div>
      <div className="container section2">
        <p>
          <strong>Telurusi Kategori</strong>
        </p>

        <div className="button-homepage">
          <button type="button" className="btn btn-secondary button_filter_semua me-2">
            <i className="bi bi-search"></i> Semua
          </button>
          <button type="button" className="btn btn-secondary me-2">
            <i className="bi bi-search"></i> Gitar
          </button>
          <button type="button" className="btn btn-secondary me-2">
            <i className="bi bi-search"></i> Aksesoris
          </button>
          <button type="button" className="btn btn-secondary me-2">
            <i className="bi bi-search"></i> Search
          </button>
          <button type="button" className="btn btn-secondary me-2">
            <i className="bi bi-search"></i> Search
          </button>
        </div>

        <div className="konten row row-cols-2 row-cols-md-4">{handleCardProduct()}</div>
      </div>
    </div>
  );
};

export default HomePage;
