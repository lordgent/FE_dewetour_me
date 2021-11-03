import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/Contextusr";
import NavbarComp from "../../../components/navbar/NavbarComp";
import { Container, Card, Row, Col } from "react-bootstrap";
import styleprof from "./profile.module.css";
import iml from "../../../assets/icons/linux.png";
import usr from "../../../assets/icons/user1.png";
import mail from "../../../assets/icons/mail.png";
import telp from "../../../assets/icons/telp.png";
import mapss from "../../../assets/icons/mps.png";

import { Link } from "react-router-dom";
import { API } from "../../../config/api";

function ProfilePage() {
  const [user, setUser] = useState({});
  const [state, dispatch] = useContext(UserContext);
  const getUser = async () => {
    try {
      const response = await API.get(`/user/${state.user.id}`);
      setUser(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <NavbarComp />
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
                      <p className={styleprof.tr}>{user.fullname}</p>
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
                      <p className={styleprof.tr}>{user.nophone}</p>
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
                <center>
                  <img
                    src={iml}
                    alt="odskfsd"
                    width="90"
                    height="150"
                    className={styleprof.imgss}
                  />
                </center>
                <div className="mt-5">
                  <center>
                    <Link className={styleprof.btnprf} to="/client/edit">
                      Edit Profile
                    </Link>
                  </center>
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </div>
      <div className={styleprof.cardtrip}></div>
      <br />
      <br />
    </>
  );
}

export default ProfilePage;
