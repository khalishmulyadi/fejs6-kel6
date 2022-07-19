import React from "react";
import MediaQuery from "react-responsive";
import DaftarJualDesktop from "./DaftarJualDesktop";
import DaftarJualMobile from "./DaftarJualMobile";

const DaftarJual = (role) => {
  return (
    <div>
      <MediaQuery minWidth={577}>
        <DaftarJualDesktop role={role.role} />
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <DaftarJualMobile role={role.role} />
      </MediaQuery>
    </div>
  );
};

export default DaftarJual;
