import React from "react";
import MediaQuery from "react-responsive";
import DaftarBeliDesktop from "./DaftarBeliDesktop";
import DaftarBeliMobile from "./DaftarBeliMobile";

const DaftarBeli = (role) => {
  return (
    <div>
      <MediaQuery minWidth={576}>
        <DaftarBeliDesktop />
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <DaftarBeliMobile />
      </MediaQuery>
    </div>
  );
};

export default DaftarBeli;
