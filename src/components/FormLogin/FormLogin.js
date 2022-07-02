import React, { useState, useEffect } from "react";
import authService from "../../services/auth.service";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImage from "../../img/loginsecondhand.png";
import "./FormLogin.css";
import setLoginStatus from "../../redux/actions/setLoginStatus";

const FormLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // console.log("token ada", props.loginStatus);

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.access_token, user.refresh_token);

  const navigate = useNavigate();

  // useEffect(() => {
  //   props.setLoginStatus();
  //   console.log(props.loginStatus);
  // }, []);
  // if (props.loginStatus === true) {
  //   navigate("/homepage", { replace: true });
  // }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.loginUser(email, password).then(() => {
        // props.setLoginStatus();
        setError(false);

        navigate("/homepage");
        // window.location.reload();
      });
    } catch (error) {
      // console.log(error);
      setError(true);
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
            {error ? (
              <div className="alert alert-danger" role="alert">
                Email atau Password yang kamu masukkan salah!
              </div>
            ) : null}
            <div className="back_icon_desktop">
              <a href="/">
                <i className="bi bi-arrow-left me-2"></i>
                Kembali ke homepage
              </a>
            </div>
            <div className="back_icon">
              <a href="/">
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

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: () => dispatch(setLoginStatus()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
