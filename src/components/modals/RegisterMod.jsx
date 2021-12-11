import React, { useState } from "react";
import { Modal, Form, Alert } from "react-bootstrap";
import "./modals.css";
import icn from "../../assets/icons/l2.png";
import icns from "../../assets/icons/l1.png";
import swal from "sweetalert";
import { API } from "../../config/api";

function RegisterMod({ handleClose, handleShow }) {
  const [alert, setalert] = useState(null);
  const [gender, setgender] = useState(null);
  const [pass, setpass] = useState(null);

  const [form, setform] = useState({
    fullname: "",
    nophone: "",
    gender: "",
    address: "",
    email: "",
    password: "",
    passwordtwo: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.passwordtwo) {
      return swal("password tidak cocok");
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      let obj = {
        fullname: form.fullname,
        nophone: form.nophone,
        gender: form.gender,
        address: form.address,
        email: form.email,
        password: form.password,
      };
      const body = JSON.stringify(obj);

      const response = await API.post("/signup", body, config);

      if (response?.status === 200) {
        const msg = <Alert variant="success">Register is Success!</Alert>;
        setalert(msg);
      }
    } catch (error) {
      console.log(error.response.data);

      if (error.response.data.message) {
        const msg = (
          <Alert variant="danger" className="alert-auth">
            Email is Already
          </Alert>
        );
        setalert(msg);
      } else if (
        error.response.data.error.message ===
        '"gender" is not allowed to be empty'
      ) {
        const msg = (
          <Alert variant="danger" className="alert-auth">
            {error.response.data.error.message}
          </Alert>
        );
        setgender(msg);
      } else if (
        error.response.data.error.message ===
        '"password" length must be at least 8 characters long'
      ) {
        const msg = (
          <Alert variant="danger" className="alert-auth">
            {error.response.data.error.message}
          </Alert>
        );
        setpass(msg);
      }
    }
  };

  return (
    <>
      <Modal show={handleShow} onHide={handleClose}>
        <div className="tt">
          <img src={icn} alt="dfdsf" height="100" width="90" />
          <img
            src={icns}
            alt="dfdsf"
            height="70"
            width="90"
            className="ml-auto"
          />
        </div>

        <p className="text-center loo">Sign up</p>

        <Modal.Body className="mdl">
          <Form className="formm" onSubmit={handleRegister}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>fullname</Form.Label>
              <Form.Control
                type="text"
                className="inpt"
                onChange={handleChange}
                name="fullname"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="number"
                className="inpt"
                name="nophone"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <div>
                <input
                  type="radio"
                  onChange={handleChange}
                  name="gender"
                  id="male"
                  value="male"
                />
                <label htmlFor="male" className="ml-1">
                  Male
                </label>

                <input
                  className="ml-2"
                  type="radio"
                  name="gender"
                  id="female"
                  value="female"
                  onChange={handleChange}
                />
                <label htmlFor="female" className="ml-1">
                  Female
                </label>
              </div>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                className="inpt"
                name="address"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                className="inpt"
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              {pass && pass}
              <Form.Control
                type="password"
                className="inpt"
                onChange={handleChange}
                name="password"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              {pass && pass}
              <Form.Control
                type="password"
                className="inpt"
                onChange={handleChange}
                name="passwordtwo"
              />
            </Form.Group>
            {alert && alert}
            <button className="modbtn" type="submit">
              Register
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

export default RegisterMod;
