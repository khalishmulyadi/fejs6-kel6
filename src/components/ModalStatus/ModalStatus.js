import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import './ModalStatus.css'
import { connect } from 'react-redux'


export const ModalStatus = ({ Tolak, userId, onHide, ...props }) => {
    const [ValueInput, setValueInput] = useState(0);
    var axios = require('axios');
    const [Token, setToken] = useState(JSON.parse(window.sessionStorage.getItem('user')));
    const { idBarangBid } = useParams();

    const handlevalue = (e) => {
        setValueInput(e)
    }

    const handleKirim = (e) => {
        if (ValueInput === "1") {
            var config = {
                method: 'get',
                url: `https://asix-store.herokuapp.com/transaksi/${userId}/${idBarangBid}`,
                headers: {
                    'Authorization': `Bearer ${Token.access_token}`
                }
            };

            axios(config)
                .then(function (response) {
                    alert("Barang Sukses Terjual!")
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else if (ValueInput === "2") {
            Tolak();
        }
        e.preventDefault();
        onHide();
    }

    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            {console.log(ValueInput)}
            <Card className='card-modalstatus'>
                <div className='container-modalstatus'>
                    <div className='container-closeBtn-modalstatus'>
                        <button className='btn-close-modalstatus' onClick={onHide}>&#x2715;</button>
                    </div>

                    <div className='title-modalstatus'>
                        Perbarui status penjualan produkmu
                    </div>


                    <form className='form-modalstatus' onSubmit={(e) => {
                        handleKirim(e)


                    }}>
                        <div className='container-input-radio1-modalstatus'>
                            <div className='input-radio-modalstatus'>
                                <input type={"radio"} value={"1"} name={"opsiseller"} id={"myradio"} onChange={(e) => { handlevalue(e.target.value) }} />
                                <label className='label-modalstatus'>Berhasil terjual</label>
                            </div>

                            <div className='desc-and-status-modalstatus'>
                                <div>Kamu telah sepakat menjual produk ini kepada pembeli</div>
                            </div>
                        </div>

                        <div className='container-input-radio1-modalstatus'>
                            <div className='input-radio-modalstatus'>
                                <input type={"radio"} value={"2"} name={"opsiseller"} id={"myradio"} onChange={(e) => { handlevalue(e.target.value) }} />
                                <label className='label-modalstatus'>Batalkan transaksi</label>
                            </div>

                            <div className='desc-and-status-modalstatus'>
                                Kamu membatalkan transaksi produk ini dengan pembeli
                            </div>
                        </div>
                        <div className='container-btn-modalstatus'>
                            <button className='btn-modalstatus'>
                                Kirim!
                            </button>

                        </div>
                    </form>






                </div>
            </Card>
        </Modal>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         userid: state.userReducer.idUser,

//     }
// }

//  default connect(mapStateToProps, null)(ModalStatus) 