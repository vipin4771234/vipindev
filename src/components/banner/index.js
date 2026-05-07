import React from "react";
import bannerImage from "../../assets/banner-illustration.svg";
import "./style.css";

const Banner = () => {
  return (
    <div className="bannerContainer">
      <img className="bannerImage" src={bannerImage} alt="Banner background" />
      <div className="bannerOverlay">
        <p className="bannerEyebrow">SOFTWARE DEVELOPER</p>
        <h1 className="bannerTitle">Building clean, responsive interfaces.</h1>
        <p className="bannerDescription">
          Focused on React, polished component systems, and product experiences
          that feel calm, useful, and easy to navigate.
        </p>
      </div>
    </div>
  );
};

export default Banner;
