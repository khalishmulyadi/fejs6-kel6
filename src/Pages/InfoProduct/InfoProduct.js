import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import './InfoProduct.css'
import logo from '../../img/Rectangle 127.png'
import foto from '../../img/Rectangle 33.png'
import product from '../../img/jamtangan.png'


export const InfoProduct = () => {
    return (
        <div>
            <Container fluid >
                <div className='navbar-info-product'>
                    <Row className='row-navbar-infoproduct'>
                        <Col xs={1} >
                            <img alt='' src={logo} className="logo-infoproduct" />
                            <button className='arrow-back-mobile'>&#8592;</button>
                        </Col>

                        <Col xs={11}>
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
                                        <button className='arrow-back'>&#8592;</button>
                                    </div>
                                </Col>

                                <Col xs={11} className="col-card-infoproduct">
                                    <div className="container-card-infoproduct">
                                        <Card className='card-1-infoproduct'>
                                            <div className='content-card-infoproduct'>
                                                <Row>
                                                    <Col xs={2}>
                                                        <img alt='' src={foto} className="foto-profil-infoproduct" />
                                                    </Col>

                                                    <Col xs={10}>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className='namapembeli-infoproduct'>
                                                                    Nama Pembeli
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col xs={12}>
                                                                <div className='txt-infoproduct'>
                                                                    Kota
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
                                                                <img alt='' src={product} />
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
                                                                        Jam Tangan Casio
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col xs={12}>
                                                                    <div className='txt2-infoproduct'>
                                                                        Rp 250.000
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col xs={12}>
                                                                    <div className='txt2-infoproduct'>
                                                                        Ditawar Rp 200.000
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className='container-button-infoproduct'>
                                            <button className='btn-tolak-infoproduct'>Tolak</button>
                                            <button className='btn-terima-infoproduct'>Terima</button>
                                        </div>

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
