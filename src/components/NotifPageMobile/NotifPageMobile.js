import React from "react";
import MediaQuery from "react-responsive";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import Notifikasi from "../Nofitikasi/Notifikasi";

const NotifPageMobile = () => {
  return (
    <div>
      <MediaQuery maxWidth={576}>
        <NavbarDefault title="Notifikasi" />
        <Notifikasi />
        <Notifikasi />
        <Notifikasi />
      </MediaQuery>
    </div>
  );
};

export default NotifPageMobile;
