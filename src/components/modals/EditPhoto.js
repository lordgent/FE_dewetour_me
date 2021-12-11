import React, { useState, useEffect } from "react";
import { Modal, Alert } from "react-bootstrap";
import upld from "../../assets/icons/upld.png";
import styleedt from "./editmodal.module.css";
import { API } from "../../config/api";

function EditPhoto(props) {
  const [prev, setprev] = useState(null);
  const [alert, setalert] = useState(null);
  const [form, setform] = useState({
    imageProfile: "",
  });

  const handleChange = (e) => {
    setform({
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "imageProfile") {
      let url = URL.createObjectURL(e.target.files[0]);
      setprev(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set(
        "imageProfile",
        form.imageProfile[0],
        form.imageProfile[0].name
      );
      console.log(formData);
      const response = await API.put("/user", formData, config);

      if (response?.status === 200) {
        const msg = <Alert>edit photo Success</Alert>;
        setalert(msg);
        props.getProfile();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={props.handleShow} centered onHide={props.handleClose}>
        <Modal.Body>
          <div>
            <form className={styleedt.formprofile}>
              <p>Create Your Photo Profile</p>
              {alert && alert}
              {!prev ? (
                <>
                  <label htmlFor="imageProfile" className={styleedt.label}>
                    <img src={upld} alt="imageprofile" />
                    <span className={styleedt.textlabel}>choice file</span>
                  </label>
                  <input
                    name="imageProfile"
                    type="file"
                    onChange={handleChange}
                    id="imageProfile"
                    hidden
                  />
                </>
              ) : (
                <>
                  <center>
                    <img
                      src={prev}
                      alt="imagesfoto"
                      className={styleedt.imagechoice}
                    />
                  </center>
                </>
              )}
              <br />
              <button
                className={styleedt.butedit}
                type="submit"
                onClick={handleSubmit}
              >
                Edit
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPhoto;
