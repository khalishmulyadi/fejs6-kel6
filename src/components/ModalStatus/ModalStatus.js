import React, { useEffect, useState } from 'react'
import { Card, Modal } from 'react-bootstrap'
import './ModalStatus.css'


export const ModalStatus = ({ onHide, ...props }) => {
    const [ValueBerhasil, setValueBerhasil] = useState(false)
    const [ValueBatal, setValueBatal] = useState(false)

    const handleChecked = (e) => {
        // setValueBerhasil(!ValueBerhasil)
        console.log(e);
        console.log(ValueBerhasil);

    }

    const handleChecked2 = (e) => {
        // setValueBatal(!ValueBatal)
        console.log(e);
        console.log(ValueBatal);
    }

    const handleValueStatus = () => {
        setValueBerhasil(true)
        console.log(ValueBerhasil);
    }

    const handleValueStatus2 = () => {
        setValueBatal(true)
        console.log(ValueBatal);
    }

    




    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Card className='card-modalstatus'>
                <div className='container-modalstatus'>
                    <div className='container-closeBtn-modalstatus'>
                        <button className='btn-close-modalstatus' onClick={onHide}>&#x2715;</button>
                    </div>

                    <div className='title-modalstatus'>
                        Perbarui status penjualan produkmu
                    </div>


                    <form className='form-modalstatus' >
                        <div className='container-input-radio1-modalstatus'>
                            <div className='input-radio-modalstatus'>
                                <input type={"radio"} value={"1"} name={"opsiseller"} id={"myradio"} onChange={(e) => { handleChecked(e.target.value) }} onClick={() => { handleValueStatus() }} />
                                <label className='label-modalstatus'>Berhasil terjual</label>
                            </div>

                            <div className='desc-and-status-modalstatus'>
                                <div>Kamu telah sepakat menjual produk ini kepada pembeli</div>
                            </div>
                        </div>

                        <div className='container-input-radio1-modalstatus'>
                            <div className='input-radio-modalstatus'>
                                <input type={"radio"} value={"2"} name={"opsiseller"} id={"myradio"} onChange={(e) => { handleChecked2(e.target.value) }} onClick={() => { handleValueStatus2() }} />
                                <label className='label-modalstatus'>Batalkan transaksi</label>
                            </div>

                            <div className='desc-and-status-modalstatus'>
                                Kamu membatalkan transaksi produk ini dengan pembeli
                            </div>
                        </div>
                    </form>


                    <div className='container-btn-modalstatus'>
                        <button className='btn-modalstatus' onClick={onHide}>
                            Kirim!
                        </button>

                    </div>




                </div>
            </Card>
        </Modal>
    )
}
