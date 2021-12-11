import React, { useContext } from "react";
import "./dropdown.css";
import { Dropdown, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import usr from "../assets/icons/user2.png";
import bil from "../assets/icons/bill1.png";
import logout from "../assets/icons/logout1.png";
import trip from "../assets/icons/trip.png";
import poll from "../assets/icons/pol.png";
import { UserContext } from "../context/Contextusr";
import country from "../assets/icons/country.png";
import message from "../../src/assets/icons/message.png";

function DropComp(props) {
  const [state, dispatch] = useContext(UserContext);
  const handleClose = () => props.setDropdown(false);
  let history = useHistory();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
    history.push("/");
    handleClose();
  };

  return (
    props.show && (
      <>
        <div className="drop" onClick={handleClose} />
        {state.user.role !== "admin" ? (
          <div className="containerdrop rounded shadow">
            <img src={poll} alt="logopol" height="30" className="tog" />
            <Dropdown.Item>
              <Link className="links" to="/user/profile">
                <Image src={usr} />
                <span className="ml-2 drop-text">Profile</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link className="links" to="/user/payment">
                <Image src={bil} />
                <span className="ml-2 drop-text">Pay</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Image src={message} />
              <span className="ml-2  drop-text">message</span>
            </Dropdown.Item>

            <hr className="har" />
            <Dropdown.Item onClick={handleLogout}>
              <Image src={logout} />
              <span className="ml-2  drop-text">Logout</span>
            </Dropdown.Item>
          </div>
        ) : (
          <div className="containerdropp rounded shadow">
            <Dropdown.Item>
              <Link className="links" to="/admin/trips">
                <img src={poll} alt="logopol" height="30" className="tog" />
                <Image src={trip} />
                <span className="ml-2  drop-text">Trip</span>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Image src={message} />
              <span className="ml-2  drop-text">message</span>
            </Dropdown.Item>

            <hr className="har" />
            <Dropdown.Item onClick={handleLogout}>
              <Image src={logout} />
              <span className="ml-2  drop-text">Logout</span>
            </Dropdown.Item>
          </div>
        )}
      </>
    )
  );
}

export default DropComp;
