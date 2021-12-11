import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import DetailPage from "./pages/details/DetailPage";
import Private from "./private/Private";
import PrivateAdmin from "./private/PrivateAdmin";
import { API, AuthToken } from "./config/api";
import { UserContext } from "./context/Contextusr";
import "./App.css";
import ProfilePage from "./pages/client/profile/ProfilePage";
import OrderPage from "./pages/client/order/OrderPage";
import TransactionAdm from "./pages/admin/transaction/TransactionAdm";
import AddnewTrip from "./pages/admin/addtrip/AddnewTrip";
import TripAdmin from "./pages/admin/Trip/TripAdmin";
import PageNotFound from "./pages/PageNotFound";
import Footer from "./components/footer/Footer";
import ChatPage from "./pages/client/chat/ChatPage";

if (localStorage.tokenkey) {
  AuthToken(localStorage.tokenkey);
}

function App() {
  const [state, dispatch] = useContext(UserContext);
  const cekAuth = async () => {
    try {
      const response = await API.get("/userauth");
      const user = response?.data?.data;

      dispatch({
        type: "AUTH",
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
  }, [state]);
  console.log(state?.isLoading);
  return (
    <>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/detail/:id" exact component={DetailPage} />
        <Private path="/user/profile" exact component={ProfilePage} />
        <Private path="/user/payment" exact component={OrderPage} />
        <Private path="/user/chat" exact component={ChatPage} />
        <PrivateAdmin path="/admin" exact component={TransactionAdm} />
        <PrivateAdmin path="/admin/trip" exact component={AddnewTrip} />
        <PrivateAdmin path="/admin/trips" exact component={TripAdmin} />
        <Route component={PageNotFound} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
