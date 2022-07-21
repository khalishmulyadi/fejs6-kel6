import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Modal } from 'react-bootstrap'
import './InfoProduct.css'
import logo from '../../img/Rectangle 127.png'
import foto from '../../img/Rectangle 33.png'
import product from '../../img/jamtangan.png'
import { ModalDefault } from '../../components/Modal/ModalDefault'
import { BtnInfoProductStatus } from '../../components/Button/BtnInfoProductStatus/BtnInfoProductStatus'
import { ModalStatus } from '../../components/ModalStatus/ModalStatus'
import { useNavigate, useParams } from 'react-router-dom'
import { connect } from 'react-redux'


const InfoProduct = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    const [ParameterButton, setParameterButton] = useState(0);
    var axios = require('axios');
    const navigate = useNavigate();

    const [Token, setToken] = useState(JSON.parse(window.sessionStorage.getItem('user')));
    const [DataTransaksi, setDataTransaksi] = useState([])
    const { idBarangBid } = useParams();
    const [Loading, setLoading] = useState(0);



    const handleBtnModal = () => {
        setParameterButton(1);
        return console.log(ParameterButton);
    }

    const handleBack = () =>{
        navigate('/homepage')
    }

    const handleTolakBidding = () => {
        var config = {
            method: 'delete',
            url: `https://asix-store.herokuapp.com/transaksi/tolak/${props.userId}/${idBarangBid}`,
            headers: {
                'Authorization': `Bearer ${Token.access_token}`
            }
        };

        axios(config)
            .then(function (response) {
                alert(JSON.stringify(response.data));
                navigate('/')
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    const handleButtonShow = () => {
        if (ParameterButton === 0) {
            return <div className='container-button-infoproduct'>
                <button className='btn-tolak-infoproduct' onClick={() => { handleTolakBidding() }}>Tolak</button>
                <button className='btn-terima-infoproduct' onClick={() => setModalShow(true)}>Terima</button>
                <ModalDefault
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    parambtn={handleBtnModal}
                    namaPembeli={namapembeli}
                    kota={kota}
                    namaBarang={namaBarang}
                    harga={harga}
                    hargaDitawar={hargaTawar}
                    imgBarang={imgBarang}
                    imgPembeli={imgPembeli}
                />
            </div>
        } else if (ParameterButton === 1) {
            console.log(ParameterButton);
            return <BtnInfoProductStatus
                userIdInfoProduct={props.userId}
                tolakTawaran={()=>{handleTolakBidding()}}
            />
        }
    }

    // handle check array kosong
    const namapembeli = DataTransaksi[0] ? DataTransaksi[0].namaBuyer : "";
    const kota = DataTransaksi[0] ? DataTransaksi[0].kota : "";
    const imgPembeli = DataTransaksi[0] ? DataTransaksi[0].profileBuyer : "";
    const imgBarang = DataTransaksi[0] ? DataTransaksi[0].gambarBarang : "";
    const namaBarang = DataTransaksi[0] ? DataTransaksi[0].namaBarang : "";
    const harga = DataTransaksi[0] ? DataTransaksi[0].hargaBarang : "";
    const hargaTawar = DataTransaksi[0] ? DataTransaksi[0].hargaTawar : "";

    // Get Data from API
    useEffect(() => {
        var config = {
            method: 'get',
            url: `https://asix-store.herokuapp.com/transaksi-detail/${idBarangBid}`,
            headers: {
                'Authorization': `Bearer ${Token.access_token}`
            }
        };

        axios(config)
            .then(function (response) {
                setDataTransaksi(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // Format Rupiah
    const formatRupiah = (value) => {
        if (!value || value == null) return `Rp 0`;
        // Convert value to string
        let newValue = value.toString();

        // Modulus operator to get division remainder
        let remainder = newValue.length % 3;

        // Substract value based on the remainder value
        let rupiah = newValue.substr(0, remainder);

        // Substract value based on the remainder and split it into array that match 3 digit
        let thousand = newValue.substr(remainder).match(/\d{3}/g);

        // Append all string
        if (thousand) {
            let separator = remainder ? '.' : '';
            rupiah += separator + thousand.join('.');
        }

        // Display output
        return `Rp ${rupiah}`;
    };

    // // handle Approve harga bidding
    // const handleApprove = () => {
    //     alert("Hit approve")

    //     console.log("Testt")

    // }


    return (
        <div>
            {console.log(idBarangBid)}
            <Container fluid className='px-0'>
                <div className='navbar-info-product'>
                    <Row className='mx-0'>
                        <Col xs={1} >
                            <button className='arrow-back-mobile-infoproduct' onClick={() =>{handleBack()}}><i class="bi bi-arrow-left"></i></button>
                        </Col>

                        <Col xs={11} >
                            <div className='txt-navbar-infoproduct'>
                                Info Penawar
                            </div>
                        </Col>
                    </Row>
                </div>

                <Container>
                    <div className='content-infoproduct'>
                        <div className='container-content-infoproduct'>
                            <Row>
                                <Col xs={1}>
                                    <div className='container-button'>
                                        <button className='arrow-back' onClick={()=>{handleBack()}}><i class="bi bi-arrow-left"></i></button>
                                    </div>
                                </Col>

                                <Col xs={11} className="col-card-infoproduct">
                                    <div className="container-card-infoproduct">
                                        <Card className='card-1-infoproduct'>
                                            <div className='content-card-infoproduct'>
                                                <Row>
                                                    <Col xs={2}>
                                                        <img alt='' src={`data:image/png;base64,${imgPembeli}`} className="foto-profil-infoproduct" />
                                                    </Col>

                                                    <Col xs={10}>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className='namapembeli-infoproduct'>
                                                                    {/* {DataTransaksi[0] ? DataTransaksi[0].namaBuyer: "" } */}
                                                                    {/* {DataTransaksi[0]?.namaBuyer } */}
                                                                    {namapembeli}


                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className='txt-infoproduct'>
                                                                    {kota}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </Col>

                                                </Row>
                                            </div>
                                        </Card>

                                        <strong className='txt1-infoproduct'>
                                            Daftar Produkmu yang Ditawar
                                        </strong>

                                        <div className='container-daftar-product-infoproduct'>
                                            <Row>
                                                <Col xs={12}>
                                                    <Row>
                                                        <Col xs={2}>
                                                            <div className='container-img-infoproduct'>
                                                                <img alt='' src={`data:image/png;base64,${imgBarang}`} />
                                                            </div>
                                                        </Col>

                                                        <Col xs={10}>
                                                            <Row>
                                                                <Col xs={12}>
                                                                    <div className='container-txt-infoproduct'>
                                                                        <div className='txt-infoproduct'>
                                                                            Penawaran produk
                                                                        </div>

                                                                        <div className='txt-infoproduct'>
                                                                            20 Apr, 14:04
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col xs={12}>
                                                                    <div className='txt2-infoproduct'>
                                                                        {namaBarang}
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col xs={12}>
                                                                    <div className='txt2-infoproduct'>
                                                                        {formatRupiah(harga)}
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col xs={12}>
                                                                    <div className='txt2-infoproduct'>
                                                                        Ditawar {formatRupiah(hargaTawar)}
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                        {handleButtonShow()}



                                        <hr />
                                    </div>


                                </Col>
                            </Row>
                        </div>
                    </div>

                </Container>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.userReducer.idUser,
    }
}

export default connect(mapStateToProps)(InfoProduct);