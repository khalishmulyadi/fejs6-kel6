import React from 'react';
import logo from "../../img/Rectangle 127.png";
import upFoto from "../../img/upFoto.png";
import "./infoprofil.css";

export const InfoProfil = () => {
  return (
    
    <div className="infoProfil">
      
      <div className="container-fluid">
        <div className="headerProfil">
          <img className="logoheader" src={logo} />
          <h3 className="">Lengkapi Info Akun</h3>
        </div>
      </div>

      <div className="formProfil">  
        <div className="back_icon">
          <a href="/#">
            <i className="bi bi-arrow-left"></i>
          </a>
        </div>
        
        <form>
        <div className="upFoto">
            <label for="customFile" className="customFile">
              <a>
                <img src={upFoto} alt="upload" />
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
          
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Nama*
            </label>
            <input class="form-control form-control-lg" 
              type="text" 
              placeholder="Nama" 
              aria-label=".form-control-lg example"/>
          </div>
            
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Kota*
            </label>
            <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
              <option selected>Pilih Kota</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>

          <div className="mb-3">
            <label for="inputState" class="form-label">
              Alamat*
            </label>
            <div class="form-floating">
              <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" Style="height: 100px"></textarea>
              <label for="floatingTextarea2">Contoh: Jalan Ikan Hiu 33</label>
            </div>
          </div>
            
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              No Handphone*
            </label>
            <input class="form-control form-control-lg" 
              type="text" 
              name="Phone Number"
              pattern="[7-9]{1}[0-9]{9}"
              placeholder="contoh: +628123456789" 
              aria-label=".form-control-lg example"/>
          </div>
          
          <button type="submit" className="btnsimpan">Simpan</button>
        </form>
      </div>
    </div>
  )
}
