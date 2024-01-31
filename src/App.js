import React, { useState, useEffect } from "react";
import "./App.css";
import StarryBackground from "./starryBackground";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaTools,
  FaEnvelope,
  FaArrowDown,
} from "react-icons/fa";
const TabLink = ({ sectionId, currentSection, scrollToSection, children }) => {
  const isActive = currentSection === sectionId;

  const handleClick = () => {
    scrollToSection(sectionId);
  };

  return (
    <div className={`tab ${isActive ? "active" : ""}`} onClick={handleClick}>
      {children}
    </div>
  );
};

const BulletPoints = ({ points }) => (
  <ul className="bullet-points">
    {points.map((point, index) => (
      <li key={index}>{point}</li>
    ))}
  </ul>
);

const App = () => {
  const [currentSection, setCurrentSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const sections = document.querySelectorAll(".content-section");
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          setCurrentSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    window.scrollTo({ top: section.offsetTop, behavior: "smooth" });
  };

  return (
    <div className="app">
      <section id="welcome-no-highlight" className="content-section">
      <div className="welcome-container">
        <StarryBackground />
        <div className="welcome">
          <h1>Hello, my name is Jace Roell</h1>
          <button
            className="view-portfolio-btn"
            onClick={() => scrollToSection("experience")}
          >
            View My Portfolio <FaArrowDown />
          </button>
        </div>
      </div>
      </section>
      <div className="tabs">
      <TabLink
          sectionId="experience"
          currentSection={currentSection}
          scrollToSection={scrollToSection}
        >
          <FaBriefcase /> Experience
        </TabLink>
        <TabLink
          sectionId="projects"
          currentSection={currentSection}
          scrollToSection={scrollToSection}
        >
          <FaCode /> Projects
        </TabLink>
        <TabLink
          sectionId="skills"
          currentSection={currentSection}
          scrollToSection={scrollToSection}
        >
          <FaTools /> Skills
        </TabLink>
        <TabLink
          sectionId="education"
          currentSection={currentSection}
          scrollToSection={scrollToSection}
        >
          <FaGraduationCap /> Education
        </TabLink>
        <TabLink
          sectionId="contact"
          currentSection={currentSection}
          scrollToSection={scrollToSection}
        >
          <FaEnvelope /> Contact Me
        </TabLink>
      </div>

      <section id="experience" className="content-section">
      <div className="header-container">
        <div className="section-header">
          <div className="header-background-red">
            <FaBriefcase className="icon" />
            <h2>Experience</h2>
          </div>
        </div>

        <div className="experience-item">
          <img src={require("./uss.png")} alt="image not found" />
          <div>
            <div className="experience-header">
              <h3>Plant Systems Developer Co-op</h3>
              <p className="date">United States Steel Corporation | June 2022 - August 2022</p>
            </div>
            <BulletPoints
              className="bullet-points"
              points={[
                "Collaborated with cross-functional teams to translate project requirements into seamless web solutions.",
                "Proficient in tackling complex web development challenges using a combination of critical thinking, analytical skills, and a deep understanding of technologies like JavaScript, TypeScript, and C#.",
                "Developed efficient and scalable web pages tailored to the specific needs of both business planning professionals and plant workers, enhancing productivity fulfilling business requirements.",
                "Designed visually appealing and user-friendly web interfaces using HTML and CSS, ensuring seamless navigation and a consistent, polished user experience across all projects and platforms.",
                "Application of technologies including: ASP.NET MVC, SQL Developer, Angular 15, Git, Azure Dev Ops",
              ]}
            />
          </div>
        </div>

        <div className="experience-item">
          <img src={require("./rmu.png")} alt="image not found" />
          <div>
            <h3>Laser Plastic Welding Researcher</h3>
            {/* Add date section here */}
            <BulletPoints
              className="bullet-points"
              points={[
                // ... Your existing points ...
              ]}
            />
          </div>
        </div>

        <div className="experience-item">
          <img src={require("./dlc.jpg")} alt="image not found" />
          <div>
            <h3>IT Department Internship/PC Support</h3>
            {/* Add date section here */}
            <BulletPoints
              className="bullet-points"
              points={[
                // ... Your existing points ...
              ]}
            />
          </div>
        </div>
      </div>
    </section>
      
      <section id="projects" className="content-section">
        <div className="header-container">
          <div className="section-header">
            <div className="header-background-blue">
              <FaCode className="icon" />
              <h2>Projects</h2>
            </div>
          </div>
          <a href="/blackjack.html" target="_blank" rel="noopener noreferrer">
            View Blackjack
          </a>
        </div>
      </section>

      <section id="skills" className="content-section">
        <div className="header-container">
          <div className="section-header">
            <div className="header-background-red">
              <FaTools className="icon" />
              <h2>Skills</h2>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="content-section">
        <div className="header-container">
          <div className="section-header">
            <div className="header-background-blue">
              <FaGraduationCap className="icon" />
              <h2>Education</h2>
            </div>
          </div>
          <div className="education-details">
            <h3>Robert Morris University, Coraopolis, PA</h3>
            <p className="degree-info">
              Currently pursuing a Bachelor of Science in Software Engineering
              with a minor in Mechatronics.
            </p>
            <p className="graduation-info">
              <strong>Graduation Date:</strong> May 2024
            </p>
            <p className="gpa-info">
              <strong>GPA:</strong> 3.75
            </p>
            <br></br>
            <h3>South Park High School, South Park, PA</h3>
            <p className="graduation-info">
              <strong>Graduation Date:</strong> May 2020
            </p>
            <p className="gpa-info">
              <strong>GPA:</strong> 3.61
            </p>
          </div>
        </div>
      </section>
      
      <section id="contact" className="content-section">
        <div className="header-container">
          <div className="section-header">
            <div className="header-background-red">
              <FaEnvelope className="icon" />
              <h2>Contact Me</h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
