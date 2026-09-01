import { Paper } from "@mui/material";
import React, { useState } from "react";
import "./style.css";
import { RiCloseFill, RiMenu3Fill } from "react-icons/ri";

const Header = ({ navItems, cvUrl, activeHref, onNavClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavLinkClick = (event, href) => {
    event.preventDefault();
    onNavClick(href);
    setMenuOpen(false);
  };

  return (
    <div className="headerWrapper">
      <Paper
        elevation={2}
        sx={{
          width: "100%",
          borderRadius: 2,
          flexDirection: "row",
          backgroundColor: "#00283a",
          minHeight: 75,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 9999,
          paddingX: { xs: 2.5, md: 4 },
        }}
      >
        <button
          type="button"
          className="brandContainer brandButton"
          onClick={(event) => handleNavLinkClick(event, "#home")}
        >
          <p className="firstName">Vipin</p>
          <p className="lastName">Vishwakarma</p>
        </button>
        <nav className="tabContainer" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              className={`about ${activeHref === item.href ? "active" : ""}`}
              href={item.href}
              aria-current={activeHref === item.href ? "page" : undefined}
              onClick={(event) => handleNavLinkClick(event, item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          className="downloadContainer"
          href={cvUrl}
          download="Vipin_Vishwakarma_Resume.pdf"
        >
          <span className="downloadText">DOWNLOAD CV</span>
        </a>
        <button
          type="button"
          className="menuButton"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((currentValue) => !currentValue)}
        >
          {menuOpen ? (
            <RiCloseFill size={26} color="rgb(211, 211, 211)" />
          ) : (
            <RiMenu3Fill size={25} color="rgb(211, 211, 211)" />
          )}
        </button>
      </Paper>
      {menuOpen ? (
        <Paper className="mobileMenu" elevation={3}>
          <nav className="mobileMenuLinks" aria-label="Mobile Primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={`mobileNavLink ${
                  activeHref === item.href ? "activeMobileNavLink" : ""
                }`}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={(event) => handleNavLinkClick(event, item.href)}
              >
                {item.label}
              </a>
            ))}
            <a
              className="mobileDownloadLink"
              href={cvUrl}
              download="Vipin_Vishwakarma_Resume.pdf"
              onClick={() => setMenuOpen(false)}
            >
              DOWNLOAD CV
            </a>
          </nav>
        </Paper>
      ) : null}
    </div>
  );
};

export default Header;
