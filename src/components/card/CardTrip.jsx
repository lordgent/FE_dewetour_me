import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./card.css";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
import travelgif from "../../assets/icons/travel.gif";

function CardTrip() {
  const rp = require("rupiah-format");
  const [isLoading, setisLoading] = useState(false);
  const [Trips, setTrips] = useState([]);

  const getTrips = async () => {
    try {
      setisLoading(true);
      const response = await API.get("/trips");
      setisLoading(false);
      setTrips(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getTrips();
  }, []);

  const images = Trips?.map((datas, i) => {
    return JSON.parse(datas?.imagestrip);
  });

  return (
    <>
      {isLoading ? (
        <div className="load">
          <img src={travelgif} alt="gifimages" width="150" height="150" />
        </div>
      ) : (
        <Row>
          {Trips?.map((item, idx) => (
            <Col key={idx} md={4}>
              <Card className="crdd" key={idx}>
                <Link to={"/detail/" + item?.id}>
                  <center>
                    <img
                      src={
                        "http://localhost:5005/uploads/images/" + images[idx][1]
                      }
                      alt={images[idx][1]}
                      className="imgl"
                    />
                  </center>
                </Link>
                <h5 className="titletrip">
                  {item?.day}D/{item?.night}N {item?.title}
                </h5>
                <p className="to">{rp.convert(item?.price)}</p>
                <p className="cnty ml-auto">{item?.country}</p>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default CardTrip;
