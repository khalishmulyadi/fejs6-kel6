import React, { useState, useEffect } from "react";
import authService from "../../services/auth.service";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import loginImage from "../../img/loginsecondhand.png";
import "./FormLogin.css";
import setLoginStatus from "../../redux/actions/setLoginStatus";
import getUserDetail from "../../redux/actions/getUserDetail";
import { Toast, ToastContainer } from "react-bootstrap";

const FormLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const token = JSON.parse(sessionStorage?.getItem("user"));

  // useEffect(() => {
  //   // props.getUserDetail();
  //   if (JSON.parse(sessionStorage?.getItem("user"))) {
  //     navigate("/homepage", { replace: true });
  //   } else {
  //     navigate("/auth/login", { replace: true });
  //   }
  // }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.loginUser(email, password).then(async () => {
        await props.getUserDetail();
        // props.setLoginStatus();
        setError(false);

        // navigate("/homepage", { replace: true });
        navigate("/homepage");
        // window.location.replace();
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
              <ToastContainer className="p-3" position="top-end">
                <Toast show={error} onClose={() => setError(false)} bg="danger" delay={3000} autohide>
                  <Toast.Header>
                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                    <strong className="me-auto">Error</strong>
                  </Toast.Header>
                  <Toast.Body className="text-light">Email atau password salah!</Toast.Body>
                </Toast>
              </ToastContainer>
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
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormLogin);
