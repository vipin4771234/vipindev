import { Paper } from "@mui/material";
import React from "react";
import "./style.css";
import { RiMenu3Fill } from "react-icons/ri";

const Header = () => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        borderRadius: 2,
        flexDirection: "row",
        backgroundColor: "#00283a",
        height: 75,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 9999,
        // paddingLeft: 10
      }}
    >
      <div
        style={{ flexDirection: "row", display: "flex", alignItems: "center" }}
      >
        <p className="firstName">Vipin</p>
        <p className="lastName">Vishwakarma</p>
      </div>
      <div className="tabContainer">
        <p className="about">HOME</p>
        <p className="about">PORTFOLIO</p>
        <p className="about">RESUME</p>
        <p className="about">CONTACT</p>
        <p className="about">BLOG</p>
      </div>
      <div className="downloadContainer">
        <p className="downloadText">DOWNLOAD CV</p>
      </div>
      <RiMenu3Fill className="menu" size={25} color="rgb(211, 211, 211)" />
    </Paper>
  );
};

export default Header;
