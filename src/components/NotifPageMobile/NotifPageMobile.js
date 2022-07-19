import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import MediaQuery from "react-responsive";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import Notifikasi from "../Nofitikasi/Notifikasi";
import NotifikasiBuyer from "../NotifikasiBuyer/NotifikasiBuyer";
import './NotifPageMobile.css'

const NotifPageMobile = (props) => {
  var axios = require('axios');
  const [Token, setToken] = useState(JSON.parse(window.sessionStorage.getItem('user')));
  const [DataNotif, setDataNotif] = useState([]);
  const [Loading, setLoading] = useState(0);

  const getData = () => {
    if (props.roleUser === 1) {
      var config = {
        method: 'get',
        url: `https://asix-store.herokuapp.com/user/notifikasi-buyer/${props.userId}/Bidding`,
        headers: {
          'Authorization': `Bearer ${Token.access_token}`
        }
      };

      axios(config)
        .then(function (response) {
          setDataNotif(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (props.roleUser === 2) {

      var config2 = {
        method: 'get',
        url: `https://asix-store.herokuapp.com/user/notifikasi-seller/${props.userId}/Bidding`,
        headers: {
          'Authorization': `Bearer ${Token.access_token}`
        }
      };


      axios(config2)
        .then(function (response) {
          setDataNotif(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });

    }
  }

  useEffect(() => {
    if (Loading !== 0) {
      getData()
    } else {
      setLoading(Loading + 1)
    }
  }, [props.userId]);

  const handleGetNotif = () => {
    // Buyer
    if (props.roleUser === 1) {
      return DataNotif.map((value, index) => {
        return (
          <a className="dropdown-item px-4" href={`product/product-detail/${value.barangId}`} key={index}>
            <NotifikasiBuyer
              namaProduk={value.namaBarang}
              harga={value.hargaAkhir}
              hargaTawar={value.hargaTawar}
              date={value.tanggalTransaksi}
              img={value.gambarBarang}
              key={index} />
          </a>
        );
      });
    }
    // Seller
    else if (props.roleUser === 2) {
      return DataNotif.map((value, index) => {
        return <a href={`infoproduct/${value.barangId}`} className="linkToInfoProduct-notifpagemobile" key={index}>
          <Notifikasi
            namaProduk={value.namaBarang}
            harga={value.hargaBarang}
            hargaTawar={value.hargaTawar}
            date={value.tanggalTawar}
            img={value.gambarBarang}
            key={index}
          />
        </a>
      })
    }
  }

  return (
    <div>
      {console.log(DataNotif)}
      <MediaQuery maxWidth={576}>
        <NavbarDefault title="Notifikasi" />

        {handleGetNotif()}

      </MediaQuery>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.idUser,
    roleUser: state.userReducer.role,
  };
};

export default connect(mapStateToProps)(NotifPageMobile);
