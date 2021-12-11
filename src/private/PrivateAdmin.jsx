import React, { useState, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import LoginMod from "../components/modals/LoginMod";
import { UserContext } from "../context/Contextusr";
import PageNotFound from "../pages/PageNotFound";

const PrivateAdmin = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          state.user.role === "admin" ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          )
        }
      />
    </>
  );
};

export default PrivateAdmin;
