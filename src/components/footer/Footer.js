import React from "react";
import stylefooter from "./footer.module.css";
import logofoot from "../../assets/icons/logofooter.png";

function Footer() {
  return (
    <>
      <div>
        <img src={logofoot} alt="logofooter" className={stylefooter.imgs} />
        <div className={stylefooter.container} fixed-bottom>
          <p className={stylefooter.text}>
            Copy right by lordgent &copy; 2020 dewe tours
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
