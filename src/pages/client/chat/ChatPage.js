import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NavbarComp from "../../../components/navbar/NavbarComp";
import stylechat from "./chat.module.css";
import { Row, Col } from "react-bootstrap";
import imgadmin from "../../../assets/icons/admin.png";
import Avatar from "react-avatar";
let socket;

function ChatPage() {
  const [Contacts, setContacts] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:5005", {
      auth: {
        token: localStorage.getItem("tokenkey"),
      },
    });

    loadContact();

    return () => {
      socket.disconnect();
    };
  }, []);

  const loadContact = () => {
    socket.emit("LoadAllContact");
    socket.on("user contact", (data) => {
      setContacts(data);
    });
  };

  return (
    <>
      <NavbarComp />
      <div className={stylechat.containerchat}>
        <Row>
          <Col md={4}>
            <h4 className={stylechat.titlecontact}>All Contact</h4>
            {Contacts?.map((item, idx) => (
              <div className={stylechat.Contact} key={idx}>
                <Row>
                  <Col md={1} className="mr-3">
                    {item?.imgprofile ? (
                      <Avatar
                        src={
                          "http://localhost:5005/uploads/profile/" +
                          item?.imgprofile
                        }
                        size="40"
                        className="rounded-circle "
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Avatar
                        src={imgadmin}
                        size="40"
                        className="rounded-circle"
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </Col>
                  <Col md={6}>
                    <p className={stylechat.nameadmin}>
                      {item?.fullname}{" "}
                      {item.role === "admin" ? (
                        <span className={stylechat.adminreal}>admin</span>
                      ) : (
                        ""
                      )}
                    </p>
                    <p className={stylechat.message}>Click start to message</p>
                  </Col>
                </Row>
              </div>
            ))}
          </Col>
          <Col md={8}>
            <div className={stylechat.chatadmin}>
              <div className={stylechat.containerinput}>
                <input
                  type="text"
                  className={stylechat.inputchat}
                  name="message"
                  placeholder="message..."
                />
                <button className={stylechat.sendmessage}>Send</button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ChatPage;
