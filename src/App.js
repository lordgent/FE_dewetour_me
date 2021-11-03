import React, { useEffect, useContext } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DetailPage from "./pages/details/DetailPage";
import dataUser from "./data/Users.json";
import dataTrip from "./data/Trip.json";
import Private from "./private/Private";
import PendingPage from "./pages/client/pending/PendingPage";
import ProfilePage from "./pages/client/profile/ProfilePage";
import OrderPage from "./pages/client/order/OrderPage";
import TransactionAdm from "./pages/admin/transaction/TransactionAdm";
import TripAdmin from "./pages/admin/Trip/TripAdmin";
import { API, AuthToken } from "./config/api";
import AddnewTrip from "./pages/admin/addtrip/AddnewTrip";
import { UserContext } from "./context/Contextusr";

if (localStorage.tokenkey) {
  AuthToken(localStorage.tokenkey);
}

function App() {
  const [state, dispatch] = useContext(UserContext);
  let history = useHistory();

  const cekAuth = async () => {
    try {
      const response = await API.get("/userauth");

      const user = response?.data?.data;
      user.token = localStorage.tokenkey;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cekAuth();
  }, []);

  useEffect(() => {
    if (localStorage.tokenkey) {
      AuthToken(localStorage.tokenkey);
    }
    if (state.stsLogin === false) {
      history.push("/");
    } else {
      if (state.user.role === "admin") {
        history.push("/admin");
      } else if (state.user.role === "user") {
        history.push("/");
      }
    }
  }, [state]);
  console.log(state.user);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(dataUser));
    localStorage.setItem("trip", JSON.stringify(dataTrip));
  }, []);

  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/detail/:id" exact component={DetailPage} />
        <Private path="/client/profile" exact component={ProfilePage} />
        <Private path="/client/order" exact component={OrderPage} />
        <Private path="/client/payment" exact component={PendingPage} />
        <Private path="/admin" exact component={TransactionAdm} />
        <Private path="/admin/trip" exact component={TripAdmin} />
        <Private path="/admin/addtrip" exact component={AddnewTrip} />
      </Switch>
    </>
  );
}

export default App;
