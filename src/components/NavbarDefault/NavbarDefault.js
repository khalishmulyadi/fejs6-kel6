import React from "react";
import MediaQuery from "react-responsive";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
const NavbarDefault = () => {
  return (
    <div>
      <MediaQuery minWidth={576}>
        <NavbarDesktop />
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <NavbarMobile />
      </MediaQuery>
    </div>
  );
};

export default NavbarDefault;
