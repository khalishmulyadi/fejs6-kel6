import React from "react";
import MediaQuery from "react-responsive";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
const NavbarDefault = (props) => {
  return (
    <div>
      <MediaQuery minWidth={577}>
        <NavbarDesktop />
      </MediaQuery>

      <MediaQuery maxWidth={576}>
        <NavbarMobile title={props.title} />
      </MediaQuery>
    </div>
  );
};

export default NavbarDefault;
