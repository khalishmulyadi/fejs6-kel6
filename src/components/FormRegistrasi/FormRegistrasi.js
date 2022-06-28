import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../img/loginsecondhand.png";
import "./FormRegistrasi.css";

export const FormRegistrasi = () => {
  var axios = require('axios');
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")


  const handleRegister = (e) => {
    e.preventDefault();
    var data = JSON.stringify({
      "nama": Name,
      "email": Email,
      "password": Password
    });

    var config = {
      method: 'post',
      url: 'https://asix-store.herokuapp.com/Buyer/registrasi',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        alert("Account Created Successfully!");
        console.log(response.data);
        navigate('/auth/login')
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  return (
    <div>
      <div className="container-fluid m-0">
        <div className="row login_group">
          <div className="d-none d-sm-flex col-sm-6 p-0">
            <img src={loginImage} className="img-fluid bg_login" alt="login_image" />
          </div>

          <div className="col-sm-6 my-auto p-md-5">
            <div className="back_icon">
              <a href="/#">
                <i className="bi bi-arrow-left"></i>
              </a>
            </div>
            <h3 className="mb-4 fw-bold">Daftar</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="nama" className="form-label">
                  Nama
                </label>
                <input type="text" className="form-control input_form" id="nama" aria-describedby="emailHelp" placeholder="Nama Lengkap" onChange={(e) => { setName(e.target.value) }} required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control input_form" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Contoh: johndee@gmail.com" onChange={(e) => { setEmail(e.target.value) }} required />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control input_form" id="exampleInputPassword1" placeholder="Masukkan password" onChange={(e) => { setPassword(e.target.value) }} required />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3 login_button" onClick={handleRegister}>
                Daftar
              </button>
            </form>
            <p className="text-center mt-5">
              Sudah Punya Akun?{" "}
              <span className="regist_here">
                <a href="login">Masuk Disini</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
