import React, { useState, useContext } from "react";
import { Modal, Form, Alert } from "react-bootstrap";
import "./modals.css";
import icn from "../../assets/icons/l2.png";
import icns from "../../assets/icons/l1.png";
import swal from "sweetalert";
import { UserContext } from "../../context/Contextusr";
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";

function LoginMod({ handleClose, handleShow }) {
  let history = useHistory();
  const users = JSON.parse(localStorage.getItem("users"));
  const [state, dispatch] = useContext(UserContext);
  const [Loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      const response = await API.post("/signin", body, config);
      if (response.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response?.data?.data,
        });
        if (response?.data?.data.role === "admin") {
          history.push("/admin");
        } else if (response?.data?.data.role === "user") {
          history.push("/");
        }
      }
    } catch (error) {
      swal("server Error");
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
          <Form className="formm" onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                className="inpt"
                onChange={handleChange}
                name="email"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                className="inpt"
                onChange={handleChange}
                name="password"
              />
            </Form.Group>
            <button className="modbtn" type="submit">
              Login
            </button>
            <p className="text-center here">
              Dont have an Account? Klik{" "}
              <span>
                <strong>Here </strong>{" "}
              </span>{" "}
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginMod;
