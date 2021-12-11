import React, { useState, useEffect, useContext } from "react";
import { Container, NavItem, Table } from "react-bootstrap";
import NavbarComp from "../../../components/navbar/NavbarComp";
import styletb from "./styletbl.module.css";
import ic from "../../../assets/icons/Vector.png";
import { API } from "../../../config/api";
import Detailorder from "../../../components/modals/Detailorder";
import { UserContext } from "../../../context/Contextusr";
import { useHistory } from "react-router-dom";

function TransactionAdm() {
  let history = useHistory();
  const [transactions, settransactios] = useState([]);
  const [showmod, setshowmod] = useState(false);
  const [thisId, setthiId] = useState(null);
  const [isLoad, setisLoad] = useState(true);
  const [state, dispatch] = useContext(UserContext);
  const getTransactions = async () => {
    try {
      const response = await API.get("/transactions");

      settransactios(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getTransactions();
      setisLoad(false);
    }, 1000);
  }, []);

  const handleShow = (item) => {
    setshowmod(true);
    setthiId(item);
  };

  return (
    <>
      <NavbarComp />
      {isLoad ? (
        <span></span>
      ) : (
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
              {transactions?.map((item, idx) => (
                <tbody>
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
                    <td>
                      {item?.status !== "approve" &&
                      item?.status !== "cancel" ? (
                        <span className={styletb.pending}>Pending</span>
                      ) : item?.status === "cancel" ? (
                        <span className={styletb.cancel}>Cancel</span>
                      ) : (
                        <span className={styletb.approved}>Approved</span>
                      )}
                    </td>
                    <td>
                      <img
                        src={ic}
                        alt="logodetailorder"
                        onClick={() => handleShow(item)}
                      />
                    </td>
                  </tr>
                  <>
                    <Detailorder
                      showDetail={showmod}
                      data={thisId}
                      setshowDetail={setshowmod}
                      getTransaction={getTransactions}
                    />
                  </>
                </tbody>
              ))}
            </Table>
          </div>
        </Container>
      )}
    </>
  );
}

export default TransactionAdm;
