import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TambahProduk.css";
import produkImg from "../../img/Group 1.png";
import getProductPreview from "../../redux/actions/getProductPreview";

const Tambah = (props) => {
  const [Gambar, setGambar] = useState(null);
  const [PrevGambar, setPrevGambar] = useState(null);
  const [NamaProduk, setNamaProduk] = useState("");
  const [MerkProduk, setMerkProduk] = useState("");
  const [SeriProduk, setSeriProduk] = useState("");
  const [Kategori, setKategori] = useState("");
  const [Harga, setHarga] = useState("");
  const [Stock, setStock] = useState("");
  const [Deskripsi, setDeskripsi] = useState("");
  const [StatusProduk, setStatusProduk] = useState("tersedia");
  // const [access_token, setAccessToken] = useState("");
  // const [user, setUserId] = useState(undefined);

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
    merkProduk: MerkProduk,
    seriProduk: SeriProduk,
    hargaProduk: Harga,
    kategoriProduk: Kategori,
    deskripsiProduk: Deskripsi,
    gambarPreview: PrevGambar,
    gambarProduk: Gambar,
  };
  const navigate = useNavigate();

  const handlePreview = (e) => {
    e.preventDefault();
    if (props.roleUser === 2) {
      if (props.dataUser.noTelepon !== null && props.dataUser.alamat !== null && props.dataUser.img !== null) {
        props.getProductPreview(dataProductPreview);
        navigate("/product/product-preview");
      } else {
        alert("Mohon lengkapi data terlebih dahulu!");
        window.location.replace("/update-profile");
      }
    } else {
      alert("Hanya seller yang bisa menjual!");
      window.location.replace("/homepage");
    }
  };

  // const userId = JSON.parse(localStorage.getItem("user"));
  //   if (props.dataUser) {
  //     setAccessToken(user.access_token);
  //   };

  // const [Token, setToken] = useState(
  //   // JSON.parse(window.localStorage.getItem("user"))
  // );

  const token = JSON.parse(sessionStorage.getItem("user"));

  const handleTerbitkan = (e) => {
    if (props.roleUser === 2) {
      if (props.dataUser.noTelepon !== null && props.dataUser.alamat !== null && props.dataUser.img !== null) {
        var FormData = require("form-data");

        var data = new FormData();
        data.append("merk", MerkProduk);
        data.append("seri", SeriProduk);
        data.append("deskripsi", Deskripsi);
        data.append("tipeBarang", Kategori);
        data.append("barangImg", Gambar);
        data.append("hargaBarang", Harga);
        data.append("namaBarang", NamaProduk);
        // data.append("stock", Stock);

        var config = {
          method: "post",
          url: `https://asix-store.herokuapp.com/barang/${props.userId}/daftar`,
          headers: {
            Authorization: `Bearer ${token.access_token} `,
          },
          data: data,
        };

        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            alert("Tambah Barang Berhasil");
          })
          .catch(function (error) {
            console.log(error);
            alert("gagal");
          });
      } else {
        alert("Mohon lengkapi data terlebih dahulu!");
        window.location.replace("/update-profile");
      }
    } else {
      alert("Hanya seller yang bisa menjual!");
      window.location.replace("/homepage");
    }
    e.preventDefault();
  };

  return (
    <div>
      <div className="container">
        <div className="tambah-produk mx-auto">
          <div className="back_icon2">
            <a href="/homepage">
              <i className="bi bi-arrow-left"></i>
            </a>
          </div>
          <h4 className="judulheader"> Lengkapi Detail Produk</h4>
        </div>
        <div className="formproduk_custom mx-auto">
          <form
            onSubmit={(e) => {
              handleTerbitkan(e);
            }}
          >
            <div className="mb-3 align-items-center mx-auto">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Nama Produk
              </label>
              <input className="form-control form1_custom" placeholder="Nama Produk" type="text" id="exampleFormControlInput1" onChange={(e) => setNamaProduk(e.target.value)} required />
            </div>

            <div className="mb-3 align-items-center mx-auto">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Merk Produk
              </label>
              <input className="form-control form1_custom" placeholder="Merk Produk" type="text" id="exampleFormControlInput1" onChange={(e) => setMerkProduk(e.target.value)} required />
            </div>

            <div className="mb-3 align-items-center mx-auto">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Seri Produk
              </label>
              <input className="form-control form1_custom" placeholder="Seri Produk" type="text" id="exampleFormControlInput1" onChange={(e) => setSeriProduk(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Harga
              </label>
              <input className="form-control form1_custom" type="text" id="exampleFormControlInput1" placeholder="Rp 0,00" onChange={(e) => setHarga(e.target.value)} required />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Kategori
              </label>
              <select aria-label="Default select example" className="form-select form1_custom" onChange={(e) => setKategori(e.target.value)} required>
                <option value="" disabled hidden>
                  Pilih Kategori
                </option>
                <option value="gitar">Gitar</option>
                <option value="aksesoris">Acsesoris</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="customFile">
                Deskripsi
              </label>
              <textarea className="form-control form-desc_custom" id="exampleFormControlTextarea1" rows="3" placeholder="Masukkan Deskripsi Produk" onChange={(e) => setDeskripsi(e.target.value)}></textarea>
            </div>

            <div className="upload">
              <label htmlFor="customFile" className="customFile">
                <p>Foto Produk</p>
                <a>
                  <img src={produkImg} alt="upload" />
                </a>
              </label>

              <input type="file" name="customFile" accept="image/png , image/jpeg, image/webp" max-size={1000} id="customFile" hidden onChange={choosePicture} required />
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
    dataUser: state.userReducer.dataUser,
    userId: state.userReducer.idUser,
    // idProduk: state.productReducer.idProduk,
    dataProduk: state.productReducer.dataProduk,
    roleUser: state.userReducer.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductPreview: (dataProductPreview) => dispatch(getProductPreview(dataProductPreview)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tambah);
