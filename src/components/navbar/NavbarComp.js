import React, { useState, useContext } from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import log from "../../assets/icons/Icon.png";
import { Link, useHistory } from "react-router-dom";
import "./navstyle.css";
import LoginMod from "../modals/LoginMod";
import RegisterMod from "../modals/RegisterMod";
import { UserContext } from "../../context/Contextusr";
import icusr from "../../assets/icons/user.png";
import bil1 from "../../assets/icons/bill1.png";
import usr from "../../assets/icons/user2.png";
import logout from "../../assets/icons/logout1.png";
import swal from "sweetalert";
import Avatar from "react-avatar";
import DropComp from "../DropComp";

function NavbarComp() {
  let history = useHistory();

  const [modal, setModal] = useState(false);
  const [modReg, setModReg] = useState(false);
  const [showDropdown, setDropdown] = useState(false);

  const [state, dispatch] = useContext(UserContext);
  const handleShowDropdown = () => setDropdown(true);
  console.log(state.stsLogin);
  const handleClick = () => {
    setModal(true);
  };
  const handleClickk = () => {
    setModReg(true);
  };

  const handleLogout = () => {
    swal("Logout is Success");
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
  };

  return (
    <>
      <Navbar expand="lg" variant="light" className="navbar" fixed="top">
        <Container>
          {state.user.role === "admin" ? (
            <Link to="/admin" className="log">
              <img src={log} alt="loooddewetour" height="53" />
            </Link>
          ) : (
            <Link to="/" className="log">
              <img src={log} alt="loooddewetour" height="53" />
            </Link>
          )}

          <div className="ml-auto">
            {!state.stsLogin ? (
              <>
                <button className="btnlog" onClick={handleClick}>
                  Login
                </button>
                <button className="btnreg" onClick={handleClickk}>
                  Register
                </button>
              </>
            ) : (
              <>
                <Avatar
                  src={icusr}
                  name={state.fullname}
                  size="40"
                  onClick={handleShowDropdown}
                  className="rounded-circle "
                  style={{ cursor: "pointer" }}
                />
              </>
            )}
          </div>
        </Container>
      </Navbar>
      <LoginMod handleShow={modal} handleClose={() => setModal(false)} />
      <RegisterMod handleShow={modReg} handleClose={() => setModReg(false)} />

      <DropComp show={showDropdown} setDropdown={setDropdown} />
    </>
  );
}

export default NavbarComp;
