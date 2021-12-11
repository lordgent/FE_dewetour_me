import React from "react";
import styledet from "./detail.module.css";
import { Card, Row, Col, Table, Button } from "react-bootstrap";
import logodewe from "../../assets/icons/Icon2.png";
import { API } from "../../config/api";
import notpay from "../../assets/icons/notpay.png";

function Detailorder(props) {
  const rp = require("rupiah-format");

  const handleClose = () => props.setshowDetail(false);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = {
        status: "approve",
      };

      const response = await API.put(
        "/transactionns/" + props?.data?.id,
        data,
        config
      );

      props.getTransaction();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        status: "cancel",
      };
      const response = await API.put(
        "/transactionns/" + props?.data?.id,
        data,
        config
      );
      props.getTransaction();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {props.showDetail && (
        <div onClick={handleClose} className={styledet.containt}>
          <Card className={styledet.cardorder}>
            <Row>
              <Col md={6}>
                <img src={logodewe} alt="logodewe" width="200" />
              </Col>
              <Col md={6}>
                <div className={styledet.booking}>
                  <h2 className={styledet.textbooking}>Booking</h2>
                  <p className={styledet.dateorder}>
                    Saturday, 27-11-2021 06:20:02
                  </p>
                </div>
              </Col>
            </Row>
            <br />
            <Row>
              <Col md={3}>
                <div className={styledet.containtorder}>
                  <p className={styledet.title}>{props?.data?.Trips?.title}</p>
                  <p className={styledet.countries}>
                    {props.data?.Trips?.Countries?.namecountry}
                  </p>

                  {props.data.status !== "approve" &&
                  props.data.status !== "cancel" ? (
                    <span className={styledet.pending}>
                      {props.data.status}
                    </span>
                  ) : props?.data?.status === "approve" ? (
                    <span className={styledet.approved}>
                      {props?.data?.status}
                    </span>
                  ) : (
                    <span className={styledet.cancel}>{props.data.status}</span>
                  )}
                </div>
              </Col>
              <Col md={3}>
                <div className={styledet.containtorder}>
                  <p className={styledet.titleorder}>Date Trip</p>
                  <p className={styledet.result}>
                    {props?.data?.Trips?.datetrip}
                  </p>
                  <p className={styledet.titleorder}>Accomodation</p>
                  <p className={styledet.result}>
                    {props?.data?.Trips?.accomodation}
                  </p>
                </div>
              </Col>
              <Col md={3}>
                <div className={styledet.containtorder}>
                  <p className={styledet.titleorder}>Duration</p>
                  <p className={styledet.result}>
                    {props?.data?.Trips?.day}Day/ {props?.data?.Trips?.night}
                    Night
                  </p>
                  <p className={styledet.titleorder}>Transpotation</p>
                  <p className={styledet.result}>
                    {props?.data?.Trips?.transpotation}
                  </p>
                </div>
              </Col>
              <Col md={3}>
                <div className={styledet.containtorder}>
                  {props.data.payment === null ? (
                    <img
                      src={notpay}
                      alt="payemntimage"
                      width="130"
                      height="130"
                      className={styledet.imagepay}
                    />
                  ) : (
                    <>
                      <img
                        src={
                          "http://localhost:5005/uploads/payment/" +
                          props.data.payment
                        }
                        alt="payemntimage"
                        width="130"
                        height="130"
                        className={styledet.imagepay}
                      />
                    </>
                  )}
                </div>
              </Col>
            </Row>

            <Table responsive className={styledet.tableorder}>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Fullname</th>
                  <th>Gender</th>
                  <th>No Phone</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <td>1</td>
                <td>{props.data?.User?.fullname}</td>
                <td>{props.data?.User?.gender}</td>
                <td>{props.data?.User?.nophone}</td>
                <td className={styledet.orderqty}>
                  Qty
                  <br />
                  <br />
                  Total
                </td>
                <td className={styledet.orderqty}>
                  {props.data?.qty}
                  <br />
                  <br />
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    {rp.convert(props.data?.subtotal)}
                  </span>
                </td>
              </tbody>
            </Table>
            {props?.data?.status !== "approve" &&
            props.data.status !== "cancel" &&
            props.data.status !== "waiting payment" ? (
              <div className="ml-auto">
                <Button className="btn btn-success mr-4" onClick={handleClick}>
                  Approve
                </Button>
                <Button className="btn btn-danger" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            ) : (
              <span></span>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default Detailorder;
