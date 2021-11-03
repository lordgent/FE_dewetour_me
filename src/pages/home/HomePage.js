import React, { useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Form,
  Jumbotron,
  FormControl,
} from "react-bootstrap";
import NavbarComp from "../../components/navbar/NavbarComp";
import stylehome from "./home.module.css";
import CardComp from "../../components/card/CardComp";
import CardTrip from "../../components/card/CardTrip";
import { UserContext } from "../../context/Contextusr";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
function HomePage() {
  const [state, dispatch] = useContext(UserContext);
  const trips = JSON.parse(localStorage.getItem("trip"));
  const [Trips, setTrips] = useState([]);
  const [filterdata, setfilterdata] = useState([]);
  console.log(state);
  const handleSearch = (e) => {
    const search = e.target.value;
    const newfilter = Trips?.filter((value) => {
      return value?.title.includes(search);
    });
    setfilterdata(newfilter);
  };

  const getFilter = async () => {
    try {
      const response = await API.get("/trips");
      setTrips(response.data.data);
      console.log(Trips);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFilter();
  }, []);

  return (
    <>
      <NavbarComp />
      <Jumbotron className={stylehome.jmbtrn}>
        <div className={stylehome.dv}>
          <h1 className={stylehome.ttl}>Explore</h1>
          <p className={stylehome.ttx}>Your Amazing City Together</p>
        </div>
        <Container>
          <label
            for="find"
            style={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "1px 1px rgb(71, 71, 71) ",
            }}
          >
            find Great places Holiday
          </label>
          <Form className="d-flex">
            <br />
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              name="search"
              id="find"
              onChange={handleSearch}
            />
            <button variant="outline-success" className={stylehome.bntnsrc}>
              Search
            </button>
          </Form>
          {!filterdata?.length ? (
            <span></span>
          ) : (
            filterdata.map((dat, i) => (
              <div className={stylehome.srch} key={i}>
                <Link className={stylehome.lnk} to={"/detail/" + dat?.id}>
                  {dat?.title}
                </Link>
              </div>
            ))
          )}
        </Container>
      </Jumbotron>
      <Container>
        <CardComp />
      </Container>
      <h2 className={stylehome.sc}>Group Tour</h2>
      <br />
      <Container>
        <CardTrip />
      </Container>

      <br />
    </>
  );
}

export default HomePage;
