import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import c1 from "../../assets/icons/c1.png";
import c2 from "../../assets/icons/c2.png";
import c3 from "../../assets/icons/c3.png";
import c4 from "../../assets/icons/c4.png";
import "./card.css";

function CardComp() {
  return (
    <>
      <Row>
        <Col md={3}>
          <Card className="crd">
            <img src={c1} alt="logoc1" width="70" />
            <h4 className="ttl">Best Price Guarantee</h4>
            <p className="tp">
              A small river named Duren flows by their place and supplies
            </p>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="crd">
            <img src={c2} alt="logoc1" width="70" />
            <h4 className="ttl">Travellers Love Us</h4>
            <p className="tp">
              A small river named Duren flows by their place and supplies
            </p>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="crd">
            <img src={c3} alt="logoc1" width="70" />
            <h4 className="ttl">Best Travel Agent</h4>
            <p className="tp">
              A small river named Duren flows by their place and supplies
            </p>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="crd">
            <img src={c4} alt="logoc1" width="70" />
            <h4 className="ttl">Our Dedicated Support</h4>
            <p className="tp">
              A small river named Duren flows by their place and supplies
            </p>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CardComp;
