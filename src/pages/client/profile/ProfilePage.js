import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/Contextusr";
import NavbarComp from "../../../components/navbar/NavbarComp";
import { Table, Card, Row, Col } from "react-bootstrap";
import styleprof from "./profile.module.css";
import iml from "../../../assets/icons/man.png";
import usr from "../../../assets/icons/user1.png";
import mail from "../../../assets/icons/mail.png";
import telp from "../../../assets/icons/telp.png";
import mapss from "../../../assets/icons/mps.png";
import EditPhoto from "../../../components/modals/EditPhoto";
import logodewe from "../../../assets/icons/Icon2.png";
import moment from "moment";
import { API } from "../../../config/api";
import PageNotFound from "../../PageNotFound";
import EditProfile from "./EditProfile";
import barcode from "../../../assets/icons/barcode.png";

function ProfilePage() {
  const rp = require("rupiah-format");
  const [user, setUser] = useState({});
  const [state, dispatch] = useContext(UserContext);
  const [isLoad, setisLoad] = useState(true);
  const [Edit, setEdit] = useState(false);
  const [transaction, settransction] = useState([]);
  const [modalPhoto, setmodalPhoto] = useState(false);
  const getUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      const responsetwo = await API.get("/transaction/");
      settransction(responsetwo?.data?.data);
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getUser();
      setisLoad(false);
    }, 1000);
  }, []);

  const handleClick = () => {
    setmodalPhoto(true);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      <NavbarComp />
      {isLoad ? (
        <div className={styleprof.load}></div>
      ) : (
        <>
          {state?.user?.role !== "user" ? (
            <PageNotFound />
          ) : (
            <>
              <div className={styleprof.prf}>
                <Card className={styleprof.crd}>
                  <Row>
                    <Col md={6}>
                      <h3 className={styleprof.if}>Personal Info</h3>
                      <div className={styleprof.dta}>
                        <Row className="d-flex">
                          <div className={styleprof.com}>
                            <Col md={2}>
                              <img src={usr} alt="okdfds" width="20" />
                            </Col>
                            <Col md={10} className="">
                              <p className={styleprof.tr}>{user?.fullname}</p>
                              <span className={styleprof.sp}>fullname</span>
                            </Col>
                          </div>
                        </Row>
                      </div>
                      <div className={styleprof.dta}>
                        <Row>
                          <div className={styleprof.com}>
                            <Col md={2}>
                              <img src={mail} alt="okdfds" width="20" />
                            </Col>
                            <Col md={10} className="">
                              <p className={styleprof.tr}>{user?.email}</p>
                              <span className={styleprof.sp}>Email</span>
                            </Col>
                          </div>
                        </Row>
                      </div>
                      <div className={styleprof.dta}>
                        <Row>
                          <div className={styleprof.com}>
                            <Col md={2}>
                              <img src={telp} alt="okdfds" width="20" />
                            </Col>
                            <Col md={10} className="">
                              <p className={styleprof.tr}>{user?.nophone}</p>
                              <span className={styleprof.sp}>No Phone</span>
                            </Col>
                          </div>
                        </Row>
                      </div>
                      <div className={styleprof.dta}>
                        <Row>
                          <div className={styleprof.com}>
                            <Col md={2}>
                              <img src={mapss} alt="okdfds" width="20" />
                            </Col>
                            <Col md={10} className="">
                              <p className={styleprof.tr}>{user?.address}</p>
                              <span className={styleprof.sp}>Address</span>
                            </Col>
                          </div>
                        </Row>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className={styleprof.prfimg}>
                        <EditPhoto
                          handleShow={modalPhoto}
                          handleClose={() => setmodalPhoto(false)}
                          getProfile={getUser}
                        />

                        {!user?.imgprofile ? (
                          <>
                            <img
                              src={iml}
                              alt="odskfsd"
                              width="100"
                              height="150"
                              className={styleprof.imgss}
                              onClick={handleClick}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src={
                                "http://localhost:5005/uploads/profile/" +
                                user?.imgprofile
                              }
                              alt="imagprofile"
                              className={styleprof.imgss}
                              onClick={handleClick}
                            />
                          </>
                        )}

                        <div className="mt-3">
                          <center>
                            <p
                              className={styleprof.btnprf}
                              onClick={handleEdit}
                            >
                              Edit Profile
                            </p>
                          </center>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </div>
              <h3 className={styleprof.titletrip}>History</h3>

              {transaction
                .filter((items) => items.status !== "waiting payment")
                .map((item, idx) => (
                  <div className={styleprof.containt} key={idx}>
                    <Card className={styleprof.cardorder}>
                      <Row>
                        <Col md={6}>
                          <img src={logodewe} alt="logodewe" width="200" />
                        </Col>
                        <Col md={6}>
                          <div className={styleprof.booking}>
                            <h2 className={styleprof.textbooking}>Booking</h2>
                            <p className={styleprof.dateorder}>
                              {moment(item?.creatdeAt).format(
                                "DD MMMM YYYY, h:mm a"
                              )}
                            </p>
                          </div>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Col md={3}>
                          <div className={styleprof.containtorder}>
                            <p className={styleprof.title}>
                              {item?.Trips?.title}
                            </p>
                            <p className={styleprof.countries}>
                              {item?.Trips?.Countries?.namecountry}
                            </p>
                            {item?.status === "approve" ? (
                              <p className={styleprof.status}>{item?.status}</p>
                            ) : item.status === "waiting approve" ? (
                              <p className={styleprof.waiting}>
                                {item?.status}
                              </p>
                            ) : (
                              <p className={styleprof.cancel}>{item?.status}</p>
                            )}
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className={styleprof.containtorder}>
                            <p className={styleprof.titleorder}>Date Trip</p>
                            <p className={styleprof.result}>
                              {moment(item?.Trips?.datetrip).format(
                                "DD MMMM YYYY, h:mm a"
                              )}
                            </p>
                            <p className={styleprof.titleorder}>Accomodation</p>
                            <p className={styleprof.result}>
                              {item?.Trips?.accomodation}
                            </p>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className={styleprof.containtorder}>
                            <p className={styleprof.titleorder}>Duration</p>
                            <p className={styleprof.result}>
                              {item?.Trips?.day}Day / {item?.Trips?.night}
                              Night
                            </p>
                            <p className={styleprof.titleorder}>
                              Transpotation
                            </p>
                            <p className={styleprof.result}>
                              {item?.Trips?.transpotation}
                            </p>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className={styleprof.containtorder}>
                            {item.status === "approve" ? (
                              <img
                                src={barcode}
                                alt="payemntimage"
                                width="130"
                                height="130"
                                className={styleprof.imagepay}
                              />
                            ) : (
                              <img
                                src={
                                  "http://localhost:5005/uploads/payment/" +
                                  item?.payment
                                }
                                alt="payemntimage"
                                width="130"
                                height="130"
                                className={styleprof.imagepay}
                              />
                            )}
                          </div>
                        </Col>
                      </Row>

                      <Table responsive className={styleprof.tableorder}>
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
                          <td>{item?.User?.fullname}</td>
                          <td>{item?.User?.gender}</td>
                          <td>{item?.User?.nophone}</td>
                          <td className={styleprof.orderqty}>
                            Qty
                            <br />
                            <br />
                            Total
                          </td>
                          <td className={styleprof.orderqty}>
                            {item?.qty}
                            <br />
                            <br />
                            <span style={{ color: "red", fontWeight: "bold" }}>
                              {rp.convert(item?.subtotal)}
                            </span>
                          </td>
                        </tbody>
                      </Table>
                    </Card>
                  </div>
                ))}
              <br />
              <br />
              <EditProfile
                handleShow={Edit}
                handleClose={() => setEdit(false)}
                editUser={getUser}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default ProfilePage;
