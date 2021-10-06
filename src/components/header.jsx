import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import Logo from "./../assets/logo.png";
import "./../App.css";

function Header() {
  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/">
          <img src={Logo} className="brand-logo" alt="logo" />{" "}
        </NavbarBrand>
      </Navbar>
    </div>
  );
}
export default Header;
