import React, { useState, useEffect, useContext } from "react";
import { Row, Container, Col } from "react-bootstrap";
import NavbarComp from "../../components/navbar/NavbarComp";
import "./styledet.css";
import hotlog from "../../assets/icons/hotlog.png";
import transpot from "../../assets/icons/plnlog.png";
import clock from "../../assets/icons/jamlog.png";
import eat from "../../assets/icons/eatlog.png";
import cal from "../../assets/icons/callog.png";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/Contextusr";
import { API } from "../../config/api";
import LoginMod from "../../components/modals/LoginMod";

function DetailPage({ match }) {
  const [state, dispatch] = useContext(UserContext);
  const [authlogin, setauthlogin] = useState(false);
  const rp = require("rupiah-format");

  let history = useHistory();
  const [detail, setDetail] = useState({});
  const [cekOrder, setcekOrder] = useState([]);
  const [qty, setqty] = useState(1);
  const [isLoading, setisLoading] = useState(true);

  const { id } = match.params;

  const DetailTrip = async () => {
    try {
      const response = await API.get(`trip/${id}`);
      setDetail(response?.data?.detail);
    } catch (error) {
      console.log(error);
    }
  };

  const getCekOrder = async () => {
    try {
      const responseTwo = await API.get("/transaction");

      setcekOrder(responseTwo?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      DetailTrip();
      getCekOrder();
      setisLoading(false);
    }, 2000);
  }, []);

  const handlePlusqty = () => {
    if (detail?.avilable - detail?.quota > qty) {
      setqty(qty + 1);
    }
  };

  const handleMinqty = () => {
    if (qty > 1) {
      setqty(qty - 1);
    }
  };

  const subtotal = detail?.price * qty;
  const handleBook = async () => {
    if (state?.stsLogin === false) {
      return setauthlogin(true);
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const form = {
        idtrip: detail?.id,
        qty: qty,
      };

      const body = JSON.stringify(form);
      const response = await API.post("/transaction", body, config);
      history.push("/user/payment");
    } catch (error) {
      console.log(error);
    }
  };

  const cek = cekOrder?.filter((item) => item?.idtrip === detail?.id);

  return (
    <>
      <NavbarComp />
      {isLoading ? (
        <div className="isloading">
          <p>loading....</p>
        </div>
      ) : (
        <>
          <div className="content">
            <h2>{detail?.title}</h2>
            <p>{detail?.country}</p>

            <div>
              <Row>
                <Col md={12}>
                  <img
                    src={detail?.image?.[2]}
                    alt="dfafdsf"
                    width="100%"
                    className="imgs"
                  />
                </Col>
              </Row>
              <Row className="mt-4">
                <Col md={4} className="clg">
                  <img
                    src={detail?.image?.[0]}
                    alt="dfafdsf"
                    width="100%"
                    height="167"
                  />
                </Col>
                <Col md={4} className="clg">
                  <img
                    src={detail?.image?.[3]}
                    alt="dfafdsf"
                    width="100%"
                    height="167"
                  />
                </Col>
                <Col md={4} className="clg">
                  <img
                    src={detail?.image?.[1]}
                    alt="dfafdsf"
                    width="100%"
                    height="167"
                  />
                </Col>
              </Row>
            </div>

            <p className="mt-3">Information Trip</p>

            <div className="container-icon">
              <div>
                <span className="title-content">Accomodation</span>
                <br />
                <img src={hotlog} alt="logohotel" height="17" />
                <span className="content-text ml-2">
                  Hotel {detail?.accomodation}{" "}
                </span>
              </div>
              <div className="content-icon">
                <span className="title-content">Transpotation</span>
                <br />
                <img src={transpot} alt="logohotel" height="17" />
                <span className="content-text ml-2">
                  {detail?.transpotation}
                </span>
              </div>
              <div className="content-icon">
                <span className="title-content">Eat</span>
                <br />
                <img src={eat} alt="logohotel" height="17" />
                <span className="content-text ml-2 eat">{detail?.eat}</span>
              </div>
              <div className="content-icon duration">
                <span className="title-content ">Duration</span>
                <br />
                <img src={clock} alt="logohotel" height="17" />
                <span className="content-text ml-2">
                  {detail.day}/Day {detail?.night}Night
                </span>
              </div>
              <div className="ml-auto">
                <span className="title-content">Date Trip</span>
                <br />
                <img src={cal} alt="logohotel" height="17" />
                <span className="content-text ml-2">{detail?.datetrip}</span>
              </div>
            </div>
            <p className="mt-3">Description</p>
            <p className="desct">{detail?.desc}</p>

            <div className="content-transaction">
              <div>
                <p className="price">
                  {rp.convert(detail.price)} <b className="person">/ Person</b>
                </p>
              </div>
              <div className="ml-auto container-action">
                <button className="btntog mr-3" onClick={handlePlusqty}>
                  +
                </button>
                <p className="qty">{qty}</p>
                <button className="btntog ml-3" onClick={handleMinqty}>
                  -
                </button>
              </div>
            </div>

            <div className="content-transaction mt-3">
              <div>
                <p className="price">
                  <b className="person">Total</b>
                </p>
              </div>
              <div className="ml-auto container-action">
                <p className="qty">{rp.convert(subtotal)}</p>
              </div>
            </div>
            <LoginMod
              handleShow={authlogin}
              handleClose={() => setauthlogin(false)}
            />
            {detail?.quota === detail?.avilable ? (
              <p className="sold-out">SOLD OUT!!</p>
            ) : (
              <button className="btnbooking" onClick={handleBook}>
                Book Now
              </button>
            )}
          </div>
          <br />
          <br />
        </>
      )}
    </>
  );
}

export default DetailPage;
