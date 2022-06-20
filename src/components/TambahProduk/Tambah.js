import React, { useState } from "react";
import "./TambahProduk.css";
import produkImg from "../../img/Group 1.png";

const Tambah = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));
  };

  return (
    <div>
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
              <input
                className="form-control form1_custom"
                placeholder="Nama Produk"
                type="text"
                id="exampleFormControlInput1"
              />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="customFile">
                Harga
              </label>
              <input
                className="form-control form1_custom"
                type="number"
                id="exampleFormControlInput1"
                placeholder="Rp 0,00"
              />
            </div>

            <div className="mb-3">
              <label for="exampleFormControlInput1" className="customFile">
                Kategori
              </label>
              <select
                aria-label="Default select example"
                className="form-select form1_custom"
              >
                <option selected>Pilih Kategori</option>
                <option value="gitar">Gitar</option>
                <option value="acsesoris">Acsesoris</option>
              </select>
            </div>

            <div className="mb-3">
              <label for="exampleFormControlTextarea1" className="customFile">
                Deskripsi
              </label>
              <textarea
                className="form-control form-desc_custom"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="Masukkan Deskripsi Produk"
              ></textarea>
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
                onChange={onSelectFile}
              />
              {selectedImages &&
                selectedImages.map((image, index) => {
                  return (
                    <img src={image} className="prevgambar" alt="upload" />
                  );
                })}
            </div>
            <div className="button_cover">
              <button type="submit" name="button_cover" className="preview">
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

export default Tambah;
