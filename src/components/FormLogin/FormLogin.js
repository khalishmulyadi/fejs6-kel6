import React, { useState } from "react";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import loginImage from "../../img/loginsecondhand.png";
import "./FormLogin.css";

const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.loginUser(email, password).then(() => {
        // navigate("/product/product-detail");
        // window.location.reload();
      });
    } catch (error) {
      console.log(error);
    }
  };

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
            <h3 className="mb-4 fw-bold">Masuk</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email
                </label>
                <input type="email" className="form-control input_form" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Contoh: johndee@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input type="password" className="form-control input_form" id="exampleInputPassword1" placeholder="Masukkan password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3 login_button">
                Masuk
              </button>
            </form>
            <p className="text-center mt-5">
              Belum punya akun?{" "}
              <span className="regist_here">
                <a href="registrasi">Daftar di sini</a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormLogin;
