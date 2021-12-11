import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import stylepay from "./stylepay.module.css";
import NavbarComp from "../../../components/navbar/NavbarComp";
import logic from "../../../assets/icons/Icon2.png";
import pay from "../../../assets/icons/receipt.png";
import AlertPayment from "../../../components/AlertPayment";
import { API } from "../../../config/api";
import moment from "moment";
import nottravel from "../../../assets/images/nottravel.png";

function OrderPage() {
  const rp = require("rupiah-format");
  const [Userorder, setUserorder] = useState([]);
  const [alertPayment, setalterPayment] = useState(false);
  const [form, setForm] = useState({
    imagePayment: "",
  });

  const [previmage, setprevimage] = useState(null);

  const getOrderUser = async () => {
    try {
      const response = await API.get("/transaction");

      setUserorder(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderUser();
  }, []);

  const datas = Userorder?.filter(
    (item) => item?.status !== "approve" && item.status !== "cancel"
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.name === "imagePayment") {
      let url = URL.createObjectURL(e.target.files[0]);
      setprevimage(url);
    }
  };

  const handlePayment = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      formData.set(
        "imagePayment",
        form.imagePayment[0],
        form.imagePayment[0].name
      );

      const response = await API.put("/transaction/" + id, formData, config);
      getOrderUser();

      if (response.status === 200) {
        setalterPayment(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarComp />
      <AlertPayment
        handleShow={alertPayment}
        handleClose={() => setalterPayment(false)}
      />
      <div className={stylepay.container}>
        <Row className={stylepay.content}>
          {datas?.length === 0 ? (
            <>
              <div className={stylepay.not}>
                <img
                  src={nottravel}
                  alt="notorder"
                  width="370"
                  className={stylepay.imgnotorder}
                />
                <h3 className={stylepay.textnot}>
                  You have not done any transaction yet
                </h3>
              </div>
            </>
          ) : (
            datas?.map((itemm, idx) => (
              <div key={idx} className={stylepay.contentorder}>
                <Col md={12}>
                  <Card className={stylepay.cardorder}>
                    <Container>
                      <Row className={stylepay.roww}>
                        <Col md={6}>
                          <img src={logic} alt="logodfs" width="140" />
                        </Col>
                        <Col md={6}>
                          <h3 className={stylepay.logoboking}>
                            Booking
                            <br />
                          </h3>
                        </Col>
                        <span className={stylepay.created}>
                          {moment(itemm?.createdAt).format(
                            "MMMM DD YYYY, h:mm:ss a"
                          )}
                        </span>
                      </Row>
                      <Row>
                        <Col md={3} className="mt-4">
                          <p className={stylepay.title}>{itemm?.Trips.title}</p>
                          <p className={stylepay.country}>{itemm?.country}</p>
                          {itemm.status === "waiting approve" ? (
                            <p className={stylepay.stswaiting}>
                              {itemm?.status}
                            </p>
                          ) : (
                            <p className={stylepay.stspayment}>
                              {itemm?.status}
                            </p>
                          )}
                        </Col>
                        <Col md={3} className="mt-4">
                          <div className={stylepay.contentor}>
                            <p className={stylepay.ttl}>Date Trip</p>
                            <p className={stylepay.resultitem}>
                              {moment(itemm?.Trips?.datetrip).format(
                                "MMMM DD YYYY, h:mm:ss a"
                              )}
                            </p>
                            <p className={stylepay.ttl}>Accomodation</p>
                            <p className={stylepay.resultitem}>
                              {itemm?.Trips?.accomodation}
                            </p>
                          </div>
                        </Col>
                        <Col md={3} className="mt-4">
                          <div>
                            <p className={stylepay.ttl}>Duration</p>
                            <p className={stylepay.resultitem}>
                              {itemm?.Trips?.day}Day / {itemm.Trips?.night}
                              Night
                            </p>
                            <p className={stylepay.ttl}>Transpotation</p>
                            <p className={stylepay.resultitem}>
                              {itemm?.Trips?.transpotation}
                            </p>
                          </div>
                        </Col>
                        <Col md={3} className="mt-4">
                          <div className={stylepay.paymentimg}>
                            {!itemm?.payment ? (
                              <>
                                {previmage === null ? (
                                  <form>
                                    <div>
                                      <label htmlFor="payment">
                                        <img
                                          src={pay}
                                          alt="logopayment"
                                          className={stylepay.imgpay}
                                        />
                                      </label>
                                      <input
                                        type="file"
                                        id="payment"
                                        name="imagePayment"
                                        onChange={handleChange}
                                        hidden
                                      />
                                    </div>
                                  </form>
                                ) : (
                                  <img
                                    src={previmage}
                                    alt="paymentproff"
                                    width="130"
                                  />
                                )}
                              </>
                            ) : (
                              <img
                                src={
                                  "http://localhost:5005/uploads/payment/" +
                                  itemm.payment
                                }
                                alt="imagepayment"
                                height="120"
                                width="120"
                                className="mr-2"
                              />
                            )}
                            <p className={stylepay.paymentttl}>
                              Upload payment Proof
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <Table responsive className={stylepay.tableorder}>
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
                          <td>{itemm?.User?.fullname}</td>
                          <td>{itemm?.User?.gender}</td>
                          <td>{itemm?.User?.nophone}</td>
                          <td className={stylepay.orderqty}>
                            Qty
                            <br />
                            <br />
                            Total
                          </td>
                          <td className={stylepay.orderqty}>
                            : {itemm?.qty}
                            <br />
                            <br />
                            <span className={stylepay.subtotal}>
                              {rp.convert(itemm?.subtotal)}
                            </span>
                          </td>
                        </tbody>
                      </Table>
                    </Container>
                  </Card>
                </Col>
                {itemm?.status === "waiting approve" ? (
                  <span></span>
                ) : (
                  <button
                    className={stylepay.btnpayment}
                    onClick={() => handlePayment(itemm?.id)}
                  >
                    Pay
                  </button>
                )}
              </div>
            ))
          )}
        </Row>
      </div>
    </>
  );
}

export default OrderPage;
