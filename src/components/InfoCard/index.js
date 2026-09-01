import React from "react";
import "./style.css";
import Typewriter from "typewriter-effect";
import profileAvatar from "../../assets/profile-avatar.svg";

export const InfoCard = () => {
  return (
    <div className="container">
      <img
        className="image"
        src={profileAvatar}
        alt="Vipin Vishwakarma avatar"
      />
      <div className="infoCardHeader">
        <p className="firstNameCard">Vipin Vishwakarma</p>
        <Typewriter
          options={{ wrapperClassName: "desigText", loop: true }}
          onInit={(typewriter) => {
            typewriter
              .typeString("I'm a Full-Stack Developer")
              .pauseFor(1000)
              .deleteAll()
              .start();
          }}
        />
      </div>
      <p className="cardSummary">
        Full-stack developer building web and mobile products with React,
        React Native, .NET, Python, and Django.
      </p>
      <div className="infoDivider" />
      <div className="infoMeta">
        <div className="infoRow">
          <span className="infoLabel">Focus</span>
          <span>React &amp; .NET</span>
        </div>
        <div className="infoRow">
          <span className="infoLabel">Based In</span>
          <span>India</span>
        </div>
        <div className="infoRow">
          <span className="infoLabel">Available</span>
          <span>Freelance & Full-time</span>
        </div>
      </div>
      <a className="cardPrimaryLink" href="#contact">
        LET&apos;S TALK
      </a>
    </div>
  );
};
