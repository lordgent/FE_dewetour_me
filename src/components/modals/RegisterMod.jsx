import React, { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import "./modals.css";
import icn from "../../assets/icons/l2.png";
import icns from "../../assets/icons/l1.png";
import swal from "sweetalert";
import { API } from "../../config/api";

function RegisterMod({ handleClose, handleShow }) {
  function getUser() {
    let datas = localStorage.getItem("users");
    if (datas) {
      return JSON.parse(datas);
    } else {
      return [];
    }
  }

  const [datausers, setdatausers] = useState(getUser());

  const [form, setform] = useState({
    fullname: "",
    nophone: "",
    gender: "",
    address: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);

      const response = await API.post("/signup", body, config);
      console.log(response);
      if (400) {
      }
      console.log(response);
      swal("Register Successfully..");
    } catch (error) {
      swal("cek...");
    }
  };

  return (
    <>
      <Modal show={handleShow} onHide={handleClose}>
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
              <Form.Label>No phone</Form.Label>
              <Form.Control
                type="number"
                className="inpt"
                name="nophone"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="gender" onChange={handleChange}>
                <option>--</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Control>
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
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                className="inpt"
                name="email"
                onChange={handleChange}
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

export default RegisterMod;
