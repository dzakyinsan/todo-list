import React from "react";
import { Navbar, NavbarBrand, NavbarText } from "reactstrap";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import LogoImage from "./../assets/cti-logo.png";
import { onUserLogout } from "./../redux/actions";
import "./../App.css";

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginOk = useSelector((state) => state.loginReducer.login);

  const onLogout = () => {
    dispatch(onUserLogout());
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="d-flex justify-content-between">
        <NavbarBrand onClick={() => history.push(`/`)}>
          <img src={LogoImage} height="50" className="d-inline-block align-top brand-image" alt="React Bootstrap logo" />
        </NavbarBrand>
        {loginOk && (
          <NavbarText className="nav-text pointer" onClick={onLogout}>
            Logout
          </NavbarText>
        )}
      </Navbar>
    </div>
  );
}
export default Header;
