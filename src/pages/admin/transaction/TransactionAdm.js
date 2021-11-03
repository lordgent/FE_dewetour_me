import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";
import NavbarComp from "../../../components/navbar/NavbarComp";
import styletb from "./styletbl.module.css";
import { Link } from "react-router-dom";
import ic from "../../../assets/icons/Vector.png";
import DetailOrder from "../../../components/modals/DetailOrder";
import { API } from "../../../config/api";

function TransactionAdm() {
  const [transactions, settransactios] = useState([]);

  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");
      console.log(response.data);
      settransactios(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getTransactions();
  }, []);
  console.log(transactions);
  // const order = JSON.parse(localStorage.getItem("ordertrip"));
  // const [modal, setModal] = useState(false);
  // const handleModal = () => {
  //   setModal(true);
  // };
  return (
    <>
      <NavbarComp />
      <Container>
        <div className={styletb.tb}>
          <h2>Incoming Transaction</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>User</th>
                <th>Trip</th>
                <th>Bukti Transfer</th>
                <th>Status Payment</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item?.User?.fullname}</td>
                  <td>{item?.Trips.title}</td>
                  <td>
                    {item?.payment === null ? (
                      <span>-</span>
                    ) : (
                      <img
                        src={
                          "http://localhost:5005/uploads/payment/" +
                          item?.payment
                        }
                        alt="bca.jpg"
                        height="40"
                        width="40"
                      />
                    )}
                  </td>
                  <DetailOrder />
                  <td>
                    {item?.status !== "Approve" ? (
                      <span className={styletb.pd}>Pending</span>
                    ) : (
                      <span></span>
                    )}
                  </td>

                  <td>
                    <img src={ic} alt="logodetailorder" />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}

export default TransactionAdm;
