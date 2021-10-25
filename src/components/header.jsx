import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "./../App.css";

function Header() {
  return (
    <div>
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/"></NavbarBrand>
      </Navbar>
    </div>
  );
}
export default Header;
