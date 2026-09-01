import React from "react";
import bannerImage from "../../assets/banner-illustration.svg";
import "./style.css";

const Banner = () => {
  return (
    <div className="bannerContainer">
      <img className="bannerImage" src={bannerImage} alt="Banner background" />
      <div className="bannerOverlay">
        <p className="bannerEyebrow">FULL-STACK DEVELOPER</p>
        <h1 className="bannerTitle">Building web and mobile products.</h1>
        <p className="bannerDescription">
          React, React Native, .NET, Python, and Django — from public
          enrollment flows to signed-in member portals.
        </p>
      </div>
    </div>
  );
};

export default Banner;
