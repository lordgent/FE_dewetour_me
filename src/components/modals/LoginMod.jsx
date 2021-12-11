import React, { useState, useContext } from "react";
import { Modal, Form, Alert } from "react-bootstrap";
import "./modals.css";
import icn from "../../assets/icons/l2.png";
import icns from "../../assets/icons/l1.png";
import swal from "sweetalert";
import { UserContext } from "../../context/Contextusr";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";
import view from "../../assets/icons/view.png";
import hide from "../../assets/icons/hidden.png";
function LoginMod({ handleClose, handleShow }) {
  let history = useHistory();

  const [state, dispatch] = useContext(UserContext);
  const [alert, setalert] = useState(null);

  const [Pass, setPass] = useState("password");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.post("/signin", body, config);
      if (response.status === 200) {
        handleClose(true);
        swal("Login success..");
        const datas = response.data.user;
        console.log(datas.data.token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            id: datas?.data?.id,
            fullname: datas?.data?.fullname,
            imgprofile: datas?.data?.imgprofile,
            email: datas?.data?.email,
            role: datas?.data?.role,
            gender: datas?.data?.gender,
            nophone: datas?.data?.nophone,
            token: datas?.token,
          },
        });

        if (datas.data.role === "admin") {
          history.push("/admin");
        } else if (datas.data.role === "user") {
          history.push("/");
        }
      }
    } catch (error) {
      if (error.response.data.message === "username/password incorrect") {
        const msg = <Alert variant="danger">Email/password Incorrect!</Alert>;
        setalert(msg);
      }
    }
  };

  const showPassword = (e) => {
    if (!e.target.checked) {
      setPass("password");
    } else {
      setPass("text");
    }
  };

  return (
    <>
      <Modal show={handleShow} onHide={handleClose} className="mm">
        <div className="tt">
          <img src={icn} alt="dfdsf" height="100" width="120" />
          <img
            src={icns}
            alt="dfdsf"
            height="70"
            width="90"
            className="ml-auto"
          />
        </div>

        <p className="text-center loo">Sign in</p>

        <Modal.Body className="mdl">
          {alert && alert}
          <Form className="formm" onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                className="inputpass"
                onChange={handleChange}
                name="email"
                placeholder="Ex : usr@mail.."
              />
            </Form.Group>

            <div className="passwd">
              <label>Password</label>
              <br />
              <div>
                <input
                  type={Pass}
                  className="inputpass"
                  onChange={handleChange}
                  name="password"
                  placeholder="Strong password"
                />
                <label className="showpass" htmlFor="pass">
                  {Pass === "text" ? (
                    <img src={view} alt="logo " height="25" />
                  ) : (
                    <img src={hide} alt="logo " height="25" />
                  )}
                </label>
                <input
                  type="checkbox"
                  id="pass"
                  className="ml-2"
                  onClick={showPassword}
                  hidden
                />
              </div>
            </div>
            <button className="modbtn" type="submit">
              Login
            </button>
            <p className="text-center here">
              Dont have an Account? Klik
              <span>
                <strong>Here </strong>
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginMod;
