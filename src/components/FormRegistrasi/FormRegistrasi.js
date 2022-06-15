import React from 'react'
import loginImage from "../../img/loginsecondhand.png";
import './FormRegistrasi.css'

export const FormRegistrasi = () => {
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
                        <form>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">
                                    Email
                                </label>
                                <input type="email" className="form-control input_form" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Contoh: johndee@gmail.com" />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputPassword1" className="form-label">
                                    Password
                                </label>
                                <input type="password" className="form-control input_form" id="exampleInputPassword1" placeholder="Masukkan password" />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-3 login_button">
                                Masuk
                            </button>
                        </form>
                        <p className="text-center mt-5">
                            Belum punya akun?{" "}
                            <span className="regist_here">
                                <a href="/#">Daftar di sini</a>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
