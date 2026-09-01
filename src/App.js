import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/header";
import Banner from "./components/banner";
import { InfoCard } from "./components/InfoCard";
import Sections from "./components/sections";
import cvUrl from "./assets/Vipin_Vishwakarma_Resume.pdf";

const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "PORTFOLIO", href: "#portfolio" },
  { label: "RESUME", href: "#resume" },
  { label: "CONTACT", href: "#contact" },
  { label: "BLOG", href: "#blog" },
];

function App() {
  const [activeHref, setActiveHref] = useState("#home");

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((firstEntry, secondEntry) => {
            return secondEntry.intersectionRatio - firstEntry.intersectionRatio;
          });

        if (visibleEntries.length > 0) {
          setActiveHref(`#${visibleEntries[0].target.id}`);
        }
      },
      {
        rootMargin: "-28% 0px -52% 0px",
        threshold: [0.2, 0.35, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href) => {
    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveHref(href);
    }
  };

  return (
    <div className="App">
      <Header
        navItems={navItems}
        cvUrl={cvUrl}
        activeHref={activeHref}
        onNavClick={handleNavClick}
      />
      <main className="pageContent">
        <section id="home" className="heroSection">
          <Banner />
          <InfoCard />
        </section>
        <Sections cvUrl={cvUrl} />
      </main>
    </div>
  );
}

export default App;
