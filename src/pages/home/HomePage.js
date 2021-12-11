import React, { useState, useContext, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  Container,
  Form,
  Jumbotron,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import NavbarComp from "../../components/navbar/NavbarComp";
import stylehome from "./home.module.css";
import CardComp from "../../components/card/CardComp";
import CardTrip from "../../components/card/CardTrip";
import { UserContext } from "../../context/Contextusr";
import { Link, useHistory } from "react-router-dom";
import { API } from "../../config/api";
import mapboxgl from "mapbox-gl";
function HomePage() {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  const [Trips, setTrips] = useState([]);
  const [filterdata, setfilterdata] = useState([]);

  const handleSearch = (e) => {
    const search = e.target.value;
    const newfilter = Trips?.filter((value) => {
      return value?.title.toLowerCase().includes(search);
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

  const handleDelete = () => {
    setfilterdata([]);
  };

  useEffect(() => {
    getFilter();
  }, []); // eslint-disable-line import/no-webpack-loader-syntax

  return (
    <>
      <NavbarComp />
      {state.user.role === "admin" ? (
        history.push("/admin")
      ) : (
        <>
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
                  className={stylehome.inputsearch}
                  aria-label="Search"
                  name="search"
                  id="find"
                  onChange={handleSearch}
                  autocomplete="off"
                  onKeyDown={handleDelete}
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
          <br />
          <Container>
            <CardTrip />
          </Container>
          <div
            style={{
              width: "100%",
              padding: "10px 130px 0 130px",
              marginBottom: "40px",
            }}
          ></div>

          <br />
          <br />
          <br />
        </>
      )}
    </>
  );
}

export default HomePage;
