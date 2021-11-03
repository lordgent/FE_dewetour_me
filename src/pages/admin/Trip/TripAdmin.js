import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardTrip from "../../../components/card/CardTrip";
import { Link } from "react-router-dom";
import styletrp from "./trip.module.css";
import NavbarComp from "../../../components/navbar/NavbarComp";
function TripAdmin() {
  return (
    <>
      <NavbarComp />
      <br /> <br /> <br /> <br />
      <Container>
        <Row>
          <Col md={6}>
            <h2>Income Trip</h2>
          </Col>
          <Col md={6}>
            <Link to="/admin/addtrip" className={styletrp.btntrp}>
              Add Trip
            </Link>
          </Col>
        </Row>
        <CardTrip />
      </Container>
    </>
  );
}

export default TripAdmin;
