import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import "./card.css";
import { Link } from "react-router-dom";
import { API } from "../../config/api";

function CardTrip() {
  const rp = require("rupiah-format");
  const [isLoading, setisLoading] = useState(false);
  const [Trips, setTrips] = useState([]);

  const getTrips = async () => {
    try {
      const response = await API.get("/trips");
      setisLoading(false);
      setTrips(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    setisLoading(true);
    setTimeout(() => {
      getTrips();
    }, 1000);
  }, []);

  const images = Trips?.map((datas, i) => {
    return JSON.parse(datas?.imagestrip);
  });

  return (
    <>
      {isLoading ? (
        <div className="load"></div>
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

                  <span className="quota">
                    {item?.quota}/{item?.avilable}
                  </span>
                </Link>
                <div className="p-2">
                  <h5 className="titletrip mt-3">
                    {item?.day}D/{item?.night}N {item?.title}
                  </h5>

                  <p className="to">
                    {" "}
                    {item?.quota === item?.avilable
                      ? "SOLD OUT"
                      : rp.convert(item?.price)}
                  </p>
                  <p className="cnty ml-auto">{item?.Countries?.namecountry}</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default CardTrip;
