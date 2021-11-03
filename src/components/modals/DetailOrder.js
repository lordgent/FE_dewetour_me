import React from "react";
import { Modal, Card, Row, Col } from "react-bootstrap";
import iconn from "../../assets/icons/Icon2.png";
import "./stylemodal.css";
import pay from "../../assets/images/bca.jpg";

function DetailOrder({ handleShow, handleClose, datas }) {
  return (
    <>
      <Modal show={handleShow} onHide={handleClose} className="mod">
        <Card className="dd">
          <Row>
            <Col md={6}>
              <img src={iconn} alt="doaksfd" width="100" />
            </Col>
            <Col md={6}>
              <h4 className="bk">Booking</h4>
            </Col>
          </Row>
          <br />
          <Row>
            <Col md={3}>
              <p className="t">
                {datas?.day}D/{datas?.night}N {datas?.title}
              </p>
              <p className="t">{datas?.Countries?.namecountry}</p>
              <br />

              <p className="statuspay">{datas?.status}</p>
            </Col>
            <Col md={3}>
              <p className="t">Date Trip</p>
              <p className="datetrip">{datas?.date}</p>
              <p className="t">Acomodation</p>
              <p className="t">{datas?.acomodation}</p>
            </Col>
            <Col md={3}>
              <p className="t">Duration</p>
              <p className="t">
                {datas?.day}Day/{datas?.night}Night
              </p>
              <p className="tt">Transpotation</p>
              <p className="t">{datas?.transpotation}</p>
            </Col>
            <Col md={3}>
              <img src={pay} alt="payment" width="90" height="90" />
              <p className="t">qty: {datas?.qty}</p>
              <p className="t">total: {datas?.subtotal}</p>
            </Col>
          </Row>

          <br />
          <br />
          <div className="sd">
            <button className="btn btn-danger">Cancel</button>
            <button className="btn btn-success ml-3">Approve</button>
          </div>
        </Card>
      </Modal>
    </>
  );
}

export default DetailOrder;
