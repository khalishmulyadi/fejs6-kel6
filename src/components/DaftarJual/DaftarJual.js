import React from "react";
import MediaQuery from "react-responsive";
import DaftarJualDesktop from "./DaftarJualDesktop";
import DaftarJualMobile from "./DaftarJualMobile";

const DaftarJual = () => {
  return (
    <div>
      <MediaQuery minWidth={576}>
        <DaftarJualDesktop />
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <DaftarJualMobile />
      </MediaQuery>
    </div>
  );
};

export default DaftarJual;
