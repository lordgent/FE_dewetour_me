import React from "react";
import "./stylealert.css";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function AlertPayment(props) {
  let history = useHistory();

  const handlePush = () => history.push("/user/profile");
  return (
    <>
      <Modal
        show={props.handleShow}
        onHide={props.handleClose}
        size="lg"
        centered
      >
        <div className="contentpayment">
          <p className="textpay">
            Your payment will be confirmed within 1 x 24 hours To see orders
            click
            <b onClick={handlePush} style={{ cursor: "pointer" }}>
              Here
            </b>
            thank you
          </p>
        </div>
      </Modal>
    </>
  );
}

export default AlertPayment;
