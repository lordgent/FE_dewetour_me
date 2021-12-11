import React, { useState, useEffect } from "react";
import { Modal, Row, Form, Col } from "react-bootstrap";
import NavbarComp from "../../../components/navbar/NavbarComp";
import uploadsimage from "../../../assets/icons/upld.png";
import styletrip from "./addtrip.module.css";
import { API } from "../../../config/api";
import swal from "sweetalert";

function AddnewTrip() {
  const [modal, setmodal] = useState(false);
  const [form, setform] = useState({
    title: "",
    idcountry: "",
    accomodation: "",
    transpotation: "",
    eat: "",
    day: "",
    night: "",
    datetrip: "",
    price: "",
    avilable: "",
    quota: 0,
    desc: "",
    imageTrip: [],
  });
  const [SelectedFIle, setSelectedFile] = useState([]);

  const [country, setcountry] = useState([]);

  const getCountry = async () => {
    try {
      const response = await API.get("/countries");

      setcountry(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountry();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setmodal(true);
  };

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.name === "imageTrip") {
      const target = e.target.files;
      const formarr = Array.from(target).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFile((previmage) => previmage.concat(formarr));
    }
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const body = new FormData();

      body.set("title", form.title);
      body.set("idcountry", form.idcountry);
      body.set("accomodation", form.accomodation);
      body.set("transpotation", form.transpotation);
      body.set("eat", form.eat);
      body.set("day", form.day);
      body.set("night", form.night);
      body.set("datetrip", form.datetrip);
      body.set("price", form.price);
      body.set("quota", form.quota);
      body.set("price", form.price);
      body.set("avilable", form.avilable);
      body.set("desc", form.desc);

      for (let a = 0; a < form?.imageTrip?.length; a++) {
        body.append("imageTrip", form.imageTrip[a], form.imageTrip[a].name);
      }

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const response = await API.post("/trip", body, config);
      if (response.status === 200) {
        swal("success add Trip...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarComp />
      <br />
      <br />
      <br />

      <div className={styletrip.containertrip}>
        <Form encType="multipart/form-data" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title Trip</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="ex: Adventure in.."
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control as="select" name="idcountry" onChange={handleChange}>
              <option>--</option>
              {country.map((item, idx) => (
                <option value={item?.id} key={idx}>
                  {item?.namecountry}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Accomodation</Form.Label>
            <Form.Control
              type="text"
              name="accomodation"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Transpotation</Form.Label>
            <Form.Control
              type="text"
              name="transpotation"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Eat</Form.Label>
            <Form.Control type="text" name="eat" onChange={handleChange} />
          </Form.Group>
          <Form.Label>Duration</Form.Label>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Day</Form.Label>
                <Form.Control
                  type="number"
                  onChange={handleChange}
                  name="day"
                  placeholder=""
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Night</Form.Label>
                <Form.Control
                  type="number"
                  name="night"
                  placeholder=""
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Date Trip</Form.Label>
            <Form.Control
              type="date"
              name="datetrip"
              placeholder="Enter email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" name="price" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Avilable</Form.Label>
            <Form.Control
              type="number"
              name="avilable"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" name="desc" onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
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
              name="imageTrip"
              onChange={handleChange}
              multiple
            />
          </Form.Group>
          <button className={styletrip.btntrip}>Add Trip</button>
        </Form>
      </div>
      <Modal show={modal} onHide={() => setmodal(false)}>
        <Modal.Body className={styletrip.modal}>
          <p>Kamu yakin mau menambahkan Perjalanan ini ?</p>
          <button className={styletrip.butonadd} onClick={handleClick}>
            Create
          </button>
          <button
            className={styletrip.butoncancel}
            onClick={() => setmodal(false)}
          >
            Cancel
          </button>
        </Modal.Body>
      </Modal>
      <br />
      <br />
    </>
  );
}

export default AddnewTrip;
