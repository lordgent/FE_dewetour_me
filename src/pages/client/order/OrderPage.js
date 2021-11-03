import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Table, Card } from "react-bootstrap";
import stylepay from "./stylepay.module.css";
import NavbarComp from "../../../components/navbar/NavbarComp";
import logic from "../../../assets/icons/Icon2.png";
import pay from "../../../assets/icons/receipt.png";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { UserContext } from "../../../context/Contextusr";
import { API } from "../../../config/api";
function OrderPage() {
  let history = useHistory();

  const rp = require("rupiah-format");
  const orders = JSON.parse(localStorage.getItem("ordertrip"));
  const [state, dispatch] = useContext(UserContext);
  const [Userorder, setUserorder] = useState([]);
  const [form, setForm] = useState({
    imagePayment: "",
  });

  const [previmage, setprevimage] = useState(null);
  const user = JSON.parse(localStorage.getItem("userlogin"));

  const getOrderUser = async () => {
    try {
      const response = await API.get("/transaction");
      console.log(response);
      setUserorder(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderUser();
  }, []);

  const handleChange = (e, idx) => {
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
      if (response.status === 200) {
        swal("Payment Success");
        history.push("/client/order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarComp />

      <div className={stylepay.container}>
        <Row className={stylepay.content}>
          {!Userorder.length ? (
            <div>
              <p>Not Transaction</p>
            </div>
          ) : (
            Userorder?.filter((item) => item?.status !== "approve").map(
              (itemm, idx) => (
                <Col md={12} key={idx}>
                  <Card className={stylepay.cardorder}>
                    <Row>
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
                        {itemm?.createdAt}
                      </span>
                    </Row>
                    <Row>
                      <Col md={3} className="mt-4">
                        <p className={stylepay.title}>{itemm?.Trips.title}</p>
                        <p className={stylepay.country}>{itemm?.country}</p>
                        {itemm.status === "waiting approve" ? (
                          <p className={stylepay.stswaiting}>{itemm?.status}</p>
                        ) : (
                          <p className={stylepay.stspayment}>{itemm?.status}</p>
                        )}
                      </Col>
                      <Col md={3} className="mt-4">
                        <div className={stylepay.contentor}>
                          <p className={stylepay.ttl}>Date Trip</p>
                          <p className={stylepay.resultitem}>
                            {itemm?.Trips?.datetrip}
                          </p>
                          <p className={stylepay.ttl}>Accomodation</p>
                          <p className={stylepay.resultitem}>
                            {orders?.acomodation}
                          </p>
                        </div>
                      </Col>
                      <Col md={3} className="mt-4">
                        <div>
                          <p className={stylepay.ttl}>Duration</p>
                          <p className={stylepay.resultitem}>
                            {orders?.transpotation}
                          </p>
                          <p className={stylepay.ttl}>Transpotation</p>
                          <p className={stylepay.resultitem}>
                            {orders?.transpotation}
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
                          <br />:{" "}
                          <span className={stylepay.subtotal}>
                            {rp.convert(itemm?.subtotal)}
                          </span>
                        </td>
                      </tbody>
                    </Table>
                  </Card>
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
                </Col>
              )
            )
          )}
        </Row>
      </div>
    </>
  );
}

export default OrderPage;
