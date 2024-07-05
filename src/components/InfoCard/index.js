import React from "react";
import "./style.css";
import Typewriter from "typewriter-effect";

export const InfoCard = () => {
  return (
    <div className="container">
      <img
        className="image"
        src="https://trueman-react.vercel.app/img/banner2.jpg"
        alt="profile"
      />
      <div style={{ alignItems: "center", justifyContent: "center" }}>
        <p className="firstNameCard">Vipin Vishwakarma</p>
        <Typewriter
        options={{wrapperClassName: 'desigText', loop: true}}
          onInit={(typewriter) => {
                typewriter
                  .typeString("I'm Software Developer")
                  .pauseFor(1000)
                  .deleteAll()
                  .start();
          }}
        />
      </div>

      <p style={{ color: "gray", opacity: 0.3 }}>
        ...................................................................
      </p>
    </div>
  );
};
