import React from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarDefault from "../../components/NavbarDefault/NavbarDefault";
import gitarSwiper from "../../img/gitar-swiper.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.css";
const HomePage = () => {
  const slides = [];

  return (

    <div className="container">
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
                  <div className="row swiper align-items-center">
                    <div className="text-swiper-konten col-lg-6">
                      <h3>NEW COLLECTION</h3>
                      <h5>Gitar Listrik</h5>
                      <p>Gitar listrik merupakan gitar yang dicolok ke listrik dan menggunakan listrik</p>
                      {/* <button type="button" className="btn btn-secondary me-2">PESAN SEKARANG</button> */}
                    </div>

                    <div className="img-swiper-konten col-lg-6">
                      <img src={gitarSwiper} className="card-img-side" Style="width:100%;"/>
                    </div>
                  </div>                  
                </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className="card swiper-card">
                  <div className="row swiper align-items-center">
                    <div className="text-swiper-konten col-lg-6">
                      Slide 2
                    </div>
                    <div className="img-swiper-konten col-lg-6">
                      <img src={gitarSwiper} className="card-img-side" Style="width:100%;"/>
                    </div>
                  </div>                  
                </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className="card swiper-card">
                  <div className="row swiper align-items-center">
                    <div className="text-swiper-konten col-lg-6 col-sm-12">
                      Slide 3
                    </div>
                    <div className="img-swiper-konten col-lg-6">
                      <img src={gitarSwiper} className="card-img-side" Style="width:100%;"/>
                    </div>
                  </div>                  
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
          <button type="button" className="btn btn-secondary button_filter_semua me-2">
            <i className="bi bi-search"></i> Semua
          </button>
          <button type="button" className="btn btn-secondary me-2">
            <i className="bi bi-search"></i> Gitar
          </button>
          <button type="button" className="btn btn-secondary me-2">
            <i className="bi bi-search"></i> Aksesoris
          </button>
        </div>

        <div className="konten">
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
        
      </div>
      <div className="" Style="text-align: center;">
        <button type="button" className="btn btn-secondary button-jual-homepage" Style="position: fixed; bottom:20px;">
            <i className="bi bi-plus"></i> Jual
        </button>
      </div>
    </div>
  );
};

export default HomePage;
