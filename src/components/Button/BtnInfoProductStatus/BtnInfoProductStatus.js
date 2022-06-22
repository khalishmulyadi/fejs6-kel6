import React, { useState } from 'react'
import './BtnInfoProductStatus.css'
import whatsapp from '../../../img/fi_whatsapp.svg'
import { ModalStatus } from '../../ModalStatus/ModalStatus'


export const BtnInfoProductStatus = () => {
    const [modalShow, setModalShow] = useState(false);


    return (
        <div>
            <div className='container-button-infoproductstatus'>
                <button className='btn-status-infoproductstatus' onClick={() => setModalShow(true)}>Status</button>
                <ModalStatus show={modalShow} onHide={() => setModalShow(false)} />

                <div className='container-btn-infoproductstatus'>

                    <button className='btn-infoproductstatus' >
                        Hubungi di

                    </button>
                    <img alt='' src={whatsapp} className="wa-img-productstatus" />

                </div>

            </div>
        </div>
    )
}
