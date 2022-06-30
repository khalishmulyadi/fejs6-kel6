import React from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarDefault from "../../components/NavbarDefault/NavbarDefault";
import Banner from "../../img/img banner.png";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css/bundle';
import "./HomePage.css";
const HomePage = () => {

  const slides = []

  for (let i=0; i<5; i +=1) {
    slides.push (
      <SwiperSlide key={`slide-${i}`}>
        <img src={Banner} alt={`Slide ${i}`}></img>
      </SwiperSlide>
    )
  }
        
  return (
    <div className="container">
    <div className="nav-custom">
      <NavbarDefault />
    </div>
    <div className="container swiper-konten">
      <React.Fragment>
        <Swiper 
        id="main"
        preloadImages
        slidesPerView={1}
        spaceBetween
        grabCursor
        mousewheel
        centeredSlides
        >
          {slides}
        </Swiper>
      </React.Fragment>
    </div>

      <div className="">
        <h5>Telusuri Semua Kategori</h5>
        <div className="kategori-search">
          <form className="form-inline d-row">
            <div className="group_input">
              <div className="input-group-prepend">
                <button
                  className="search-btn"
                  id="button-addon2"
                  type="submit"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <input
                type="text"
                className="form-control_Custom"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="container konten row row-cols-1 row-cols-md-6">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </div>
  );
};

export default HomePage;
