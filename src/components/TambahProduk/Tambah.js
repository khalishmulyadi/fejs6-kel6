import React, { useState } from "react";
import { connect } from "react-redux";
import getProductPreview from "../../redux/actions/getProductPreview";

import "./TambahProduk.css";
import produkImg from "../../img/Group 1.png";

const Tambah = (props) => {
  const [Gambar, setGambar] = useState(null);
  const [PrevGambar, setPrevGambar] = useState(null);
  const [NamaProduk, setNamaProduk] = useState("");
  const [SeriProduk, setSeriProduk] = useState("");
  const [Kategori, setKategori] = useState("");
  const [Harga, setHarga] = useState("");
  const [Deskripsi, setDeskripsi] = useState("");
  const [StatusProduk, setStatusProduk] = useState("tersedia");

  const choosePicture = (e) => {
    // mengecek adakah file apa tidak
    if (e.target.files[0]) {
      // set file yang sudah ada kesalam use State
      setGambar(e.target.files[0]);
      //  inisiai untuk merender data file yang sudah di upload
      const reader = new FileReader();
      // melakukan proses render dan di simpan dalam value
      reader.addEventListener("load", () => {
        setPrevGambar(reader.result);
      });
      // melakuan render berdasrakan image yang di pilih
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const dataProductPreview = {
    namaProduk: NamaProduk,
    seriProduk: SeriProduk,
    hargaProduk: Harga,
    kategoriProduk: Kategori,
    deskripsiProduk: Deskripsi,
    gambarProduk: Gambar,
  };

  const handlePreview = (e) => {
    e.preventDefault();
    props.getProductPreview(dataProductPreview);
  };

  // const handleSubmit = (e) => {
  //   var axios = require("axios");
  //   var FormData = require("form-data");
  //   var data = new FormData();
  //   data.append("merk", NamaProduk);
  //   data.append("seri", SeriProduk );
  //   data.append("tipeBarang", Kategori);
  //   data.append("hargaBarang", Harga);
  //   data.append("deskripsi", Deskripsi);
  //   data.append("Status", true);
  //   data.append("barangImg", Gambar);

  //   var config = {
  //     method: "post",
  //     url:
  //     // headers: {
  //     //   ...data.getHeaders(),
  //     // },
  //     data: data,
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <div>
      {/* {console.log("ini data redux", props.dataProduk)} */}
      {/* {console.log("ini data yg dikirim", dataProductPreview)} */}
      <div className="container">
        <div className="tambah-produk mx-auto">
          <div className="back_icon2">
            <a href="/#">
              <i className="bi bi-arrow-left"></i>
            </a>
          </div>
          <h4 className="judulheader"> Lengkapi Detail Produk</h4>
        </div>
        <div className="formproduk_custom mx-auto">
          <form>
            <div className="mb-3 align-items-center mx-auto">
              <label for="exampleFormControlInput1" className="customFile">
                Nama Produk
              </label>
              <input className="form-control form1_custom" placeholder="Nama Produk" type="text" id="exampleFormControlInput1" onChange={(e) => setNamaProduk(e.target.value)} />
            </div>

            <div className="mb-3 align-items-center mx-auto">
              <label for="exampleFormControlInput1" className="customFile">
                Seri Produk
              </label>
              <input className="form-control form1_custom" placeholder="Seri Produk" type="text" id="exampleFormControlInput1" onChange={(e) => setSeriProduk(e.target.value)} />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="customFile">
                Harga
              </label>
              <input className="form-control form1_custom" type="number" id="exampleFormControlInput1" placeholder="Rp 0,00" onChange={(e) => setHarga(e.target.value)} />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="customFile">
                Kategori
              </label>
              <select aria-label="Default select example" className="form-select form1_custom" onChange={(e) => setKategori(e.target.value)}>
                <option selected>Pilih Kategori</option>
                <option value="gitar">Gitar</option>
                <option value="acsesoris">Acsesoris</option>
              </select>
            </div>

            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="customFile">
                Deskripsi
              </label>
              <textarea className="form-control form-desc_custom" id="exampleFormControlTextarea1" rows="3" placeholder="Masukkan Deskripsi Produk" onChange={(e) => setDeskripsi(e.target.value)}></textarea>
            </div>

            <div className="upload">
              <label for="customFile" className="customFile">
                <p>Foto Produk</p>
                <a>
                  <img src={produkImg} alt="upload" />
                </a>
              </label>

              <input type="file" name="customFile" accept="image/png , image/jpeg, image/webp" id="customFile" hidden onChange={choosePicture} />
              {/* {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <img src={image} className="prevgambar" alt="upload" />
                  );
                })} */}
              {PrevGambar != null && <img src={PrevGambar} alt="gambar mobil" className="prevgambar" />}
            </div>
            <div className="button_cover">
              <button type="submit" name="button_cover" className="preview" onClick={handlePreview}>
                Preview
              </button>
              <button type="submit" name="button_cover" className="terbitkan">
                Terbitkan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    idProduk: state.productReducer.idProduk,
    dataProduk: state.productReducer.dataProduk,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductPreview: (dataProductPreview) => dispatch(getProductPreview(dataProductPreview)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tambah);
