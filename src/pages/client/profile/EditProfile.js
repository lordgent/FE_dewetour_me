import React, { useState, useEffect, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import styeleprof from "./profile.module.css";
import { API } from "../../../config/api";
import { UserContext } from "../../../context/Contextusr";

function EditProfile({ handleShow, handleClose, editUser }) {
  const [state, dispatch] = useContext(UserContext);
  const [form, setform] = useState({
    fullname: "",
    email: "",
    nophone: "",
    address: "",
  });

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify(form);
      const response = await API.put("/userr", body, config);
      editUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={handleShow}
      onHide={handleClose}
      centered
      className={styeleprof.editmodal}
    >
      <Form className={styeleprof.formmodal} onClick={handleUpdate}>
        <Form.Group className="mb-3">
          <Form.Label>Fullname</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            placeholder="ex: user new.."
            onChange={handleChange}
            defaultValue={state.user.fullname}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="ex: user@mail..."
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="nophone"
            placeholder="ex: 081...."
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" onChange={handleChange} />
        </Form.Group>
        <button className={styeleprof.bottonedit}>Edit</button>
      </Form>
    </Modal>
  );
}

export default EditProfile;
