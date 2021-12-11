import React from "react";
import notpage from "../assets/images/pagenot.png";

function PageNotFound() {
  return (
    <div style={{ backgroundColor: "white", height: "100vh" }} className="pt-5">
      <div className="pagenot mt-6">
        <center>
          <img src={notpage} alt="notFound" width="400" />
          <h2>Page Not Found</h2>
        </center>
      </div>
    </div>
  );
}

export default PageNotFound;
