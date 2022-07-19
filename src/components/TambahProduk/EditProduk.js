import React, { useState, useEffect } from "react";
import axios from "axios";
import produkImg from "../../img/Group 1.png";
import { useParams } from "react-router-dom";

import { connect } from "react-redux";

// css
import "./TambahProduk.css";

const EditProduk = (props) => {
  const [barangId, setBarangId] = useState("");
  const [Gambar, setGambar] = useState(null);
  const [PrevGambar, setPrevGambar] = useState(null);
  const [GambarDefault, setGambarDefault] = useState(null);
  const [NamaProduk, setNamaProduk] = useState("");
  const [MerkProduk, setMerkProduk] = useState("");
  const [SeriProduk, setSeriProduk] = useState("");
  const [Kategori, setKategori] = useState("");
  const [Harga, setHarga] = useState("");
  const [Deskripsi, setDeskripsi] = useState("");
  const [StatusProduk, setStatusProduk] = useState("");

  const token = JSON.parse(sessionStorage.getItem("user"));

  const { idBarang } = useParams();

  // ************* Get Data Barang By Id *************
  useEffect(() => {
    var config = {
      method: "get",
      url: `https://asix-store.herokuapp.com/detail-barang/${idBarang}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data);
        setBarangId(response.data.barangId);
        setGambarDefault(response.data.barangImg);
        setNamaProduk(response.data.namaBarang);
        setMerkProduk(response.data.merk);
        setSeriProduk(response.data.seri);
        setHarga(response.data.hargaBarang);
        setKategori(response.data.tipeBarang);
        setDeskripsi(response.data.deskripsi);
      })
      .catch(function (error) {
        console.log(error);
      });
    // console.log(DataBarang);
  }, []);

  // function convert base64 to file object
  function urlToFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  const getDefaultPP = () => {
    urlToFile(`data:image/png;base64,${GambarDefault}`, "foto_produk.png", "image/png").then(function (file) {
      setGambar(file);
    });
  };

  // convert image data base64 from API to file object
  // in case user doesn't want to change the pic
  // so we use the default or preview pic
  useEffect(() => {
    getDefaultPP();
  }, [GambarDefault]);

  // function to choose picture
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
    } else {
      getDefaultPP();
    }
  };

  const handleUpdateBarang = (e) => {
    e.preventDefault();
    var FormData = require("form-data");

    var data = new FormData();
    data.append("merk", MerkProduk);
    data.append("seri", SeriProduk);
    data.append("deskripsi", Deskripsi);
    data.append("tipeBarang", Kategori);
    data.append("barangImg", Gambar);
    data.append("hargaBarang", Harga);
    data.append("namaBarang", NamaProduk);

    var config = {
      method: "put",
      url: `https://asix-store.herokuapp.com/barang/update/${props.userId}/${barangId}`,
      headers: {
        Authorization: `Bearer ${token?.access_token} `,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Update barang berhasil");
        window.location.reload("/daftar-jual");
      })
      .catch(function (error) {
        console.log(error);
        alert("Gagal update barang!");
      });
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
              handleUpdateBarang(e);
            }}
          >
            <div className="mb-3 align-items-center mx-auto">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Nama Produk
              </label>
              <input className="form-control form1_custom" placeholder="Nama Produk" type="text" value={NamaProduk} id="exampleFormControlInput1" onChange={(e) => setNamaProduk(e.target.value)} />
            </div>

            <div className="mb-3 align-items-center mx-auto">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Merk Produk
              </label>
              <input className="form-control form1_custom" placeholder="Merk Produk" type="text" value={MerkProduk} id="exampleFormControlInput1" onChange={(e) => setMerkProduk(e.target.value)} />
            </div>

            <div className="mb-3 align-items-center mx-auto">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Seri Produk
              </label>
              <input className="form-control form1_custom" placeholder="Seri Produk" type="text" value={SeriProduk} id="exampleFormControlInput1" onChange={(e) => setSeriProduk(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Harga
              </label>
              <input className="form-control form1_custom" type="number" id="exampleFormControlInput1" value={Harga} placeholder="Rp 0,00" onChange={(e) => setHarga(e.target.value)} />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="customFile">
                Kategori
              </label>
              <select defaultValue={Kategori} aria-label="Default select example" className="form-select form1_custom" onChange={(e) => setKategori(e.target.value)}>
                <option value="DEFAULT" disabled hidden>
                  Pilih Kategori
                </option>
                <option value="gitar">Gitar</option>
                <option value="aksesoris">Accessories</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="customFile">
                Deskripsi
              </label>
              <textarea className="form-control form-desc_custom" id="exampleFormControlTextarea1" value={Deskripsi} rows="3" placeholder="Masukkan Deskripsi Produk" onChange={(e) => setDeskripsi(e.target.value)}></textarea>
            </div>

            <div className="upload">
              <label htmlFor="customFile" className="customFile">
                <p>Foto Produk</p>
                <a>
                  <img src={produkImg} alt="upload" />
                </a>
              </label>

              <input type="file" name="customFile" accept="image/png , image/jpeg, image/webp" max-size={1000} id="customFile" hidden onChange={choosePicture} />
              {/* {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <img src={image} className="prevgambar" alt="upload" />
                  );
                })} */}
              {PrevGambar === null && <img src={`data:image/png;base64,${GambarDefault}`} alt="gambar mobil" className="prevgambar" />}
              {PrevGambar !== null && <img src={PrevGambar} alt="gambar mobil" className="prevgambar" />}
            </div>
            <div className="button_cover">
              <button type="submit" name="button_cover" className="terbitkan w-100">
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
    role: state.userReducer.role,
  };
};

export default connect(mapStateToProps)(EditProduk);
