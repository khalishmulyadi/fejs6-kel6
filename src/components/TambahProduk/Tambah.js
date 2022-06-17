import React from "react";
import "./TambahProduk.css";
import logo from "../../img/Rectangle 127.png";
import produkImg from "../../img/Group 1.png";

const Tambah = () => {
  return (
    <div>
      <div className="container-fluid m-0">
        <div className="headertambahproduk">
          <img className="imgheader" src={logo} />
          <h3 className="judulheader"> Lengkapi Detail Produk</h3>
        </div>
      </div>
      <div className="formproduk">
        <div className="back_icon">
          <a href="/#">
            <i className="bi bi-arrow-left"></i>
          </a>
        </div>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Tambah Produk
            </label>
            <input
              type="text"
              className="boxnama"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Nama Produk"
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Harga Produk
            </label>
            <input
              type="number"
              className="boxharga"
              id="exampleInputPassword1"
              placeholder="Rp 0,00"
            />
          </div>
          <div className="mb-3">
            <label for="inputState" class="form-label">
              Kategori Produk
            </label>
            <select id="inputState" class="boxkategori">
              <option selected>Pilih Kategori</option>
            </select>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Deskripsi
            </label>
            <input
              type="text"
              className="boxdeskripsi"
              id="exampleInputPassword1"
              placeholder="Isi deskripsi produk"
            />
          </div>

          <div className="upload">
            <label for="customFile" className="customFile">
              <p>Foto Produk</p>
              <a>
                <img src={produkImg} alt="upload" />
              </a>
            </label>

            <input
              type="file"
              name="customFile"
              accept="image/png , image/jpeg, image/webp"
              id="customFile"
              hidden
            />
          </div>

          <button type="submit" className="preview">
            Preview
          </button>
          <button type="submit" className="terbitkan">
            Terbitkan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tambah;
