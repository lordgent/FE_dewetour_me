import React, { useState, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import LoginMod from "../components/modals/LoginMod";
import { UserContext } from "../context/Contextusr";

const Private = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("tokenkey");
  const [modlog, setModlog] = useState(true);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          token ? (
            <Component {...props} />
          ) : (
            <LoginMod
              handleShow={modlog}
              handleClose={() => setModlog(false)}
            />
          )
        }
      />
    </>
  );
};

export default Private;
