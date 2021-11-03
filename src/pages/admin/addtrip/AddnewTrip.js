import React, { useState, useEffect } from "react";
import { Container, Row, Form, Col } from "react-bootstrap";
import NavbarComp from "../../../components/navbar/NavbarComp";
import uploadsimage from "../../../assets/icons/upld.png";
import styletrip from "./addtrip.module.css";

function AddnewTrip() {
  const [SelectedFIle, setSelectedFile] = useState([]);
  const [images, setimages] = useState([]);
  const [form, setform] = useState({
    image: [],
  });
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.value]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.name === "imagestrip") {
      setimages((img) => img.concat(e.target.files));
      const formarr = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFile((previmage) => previmage.concat(formarr));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };

  return (
    <>
      <NavbarComp />
      <br />
      <br />

      <div className={styletrip.containertrip}>
        <Form encType="multipart/form-data">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title Trip</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="ex: Adventure in.."
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Country</Form.Label>
            <Form.Control as="select" name="idcountry">
              <option>--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Accomodation</Form.Label>
            <Form.Control
              type="text"
              name="accomodation"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Transpotation</Form.Label>
            <Form.Control
              type="text"
              name="tranpotation"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Eat</Form.Label>
            <Form.Control type="text" name="eat" />
          </Form.Group>
          <Form.Label>Duration</Form.Label>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Day</Form.Label>
                <Form.Control type="number" name="day" placeholder="" />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Night</Form.Label>
                <Form.Control type="number" name="night" placeholder="" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Date Trip</Form.Label>
            <Form.Control
              type="date"
              name="datetrip"
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>quota</Form.Label>
            <Form.Control type="number" name="quota" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="description" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label htmlFor="imagestrip" className={styletrip.imgs}>
              {!SelectedFIle.length ? (
                <>
                  <span className={styletrip.attache}>Attache here</span>
                  <img
                    src={uploadsimage}
                    alt="logoimageuploads"
                    className={styletrip.imgp}
                  />
                </>
              ) : (
                SelectedFIle.map((itemfile) => (
                  <img
                    src={itemfile}
                    alt="imagefile"
                    height="66"
                    width="106"
                    className={styletrip.imagefile}
                  />
                ))
              )}
            </Form.Label>
            <Form.Control
              type="file"
              id="imagestrip"
              hidden
              name="imagestrip"
              onChange={handleChange}
              multiple
            />
          </Form.Group>
          <button className={styletrip.btntrip}>Add Trip</button>
        </Form>
      </div>
      <br />
    </>
  );
}

export default AddnewTrip;
