import React, { useState, useEffect } from "react";
import "./App.css";
import StarryBackground from "./starryBackground";
import ProjectEntry from './projectEntry';
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

  const projectsData = [
    {
      imageUrl: require("./blackjackExample.png"),
      name: "Live Blackjack Game",
      description: "Blackjack game to allow for live competition between users to achieve the highest balance",
      learnMoreHref: "https://github.com/jace-roell/online-blackjack",
      liveAppHref: "./blackjack.html",
      technologies: "JavaScript, HTML, CSS, Socket.io, Heroku",
    },
  ];

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
            <img
              src={require("./ussRemovedBackground.png")}
              alt="image not found"
            />
            <div>
              <div className="experience-header">
                <h3>Plant Systems Developer Co-op</h3>
                <p className="date">
                  United States Steel Corporation | May 2023 - Current
                </p>
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
              <div className="experience-header">
                <h3>Laser Welding Research Intern</h3>
                <p className="date">
                  Robert Morris University | August 2022 - May 2023
                </p>
              </div>
              <BulletPoints
                className="bullet-points"
                points={[
                  "Collaborated with cross-functional teams to efficiently achieve project objectives.",
                  "Demonstrated proficiency in NI LabVIEW for system development and optimization.",
                  "Expertly operated thermal cameras to capture and analyze data, facilitating informed decision-making.",
                  "Successfully researched and implemented feedback loop systems using WinLase, NI LabVIEW, and PIX Connect to enhance uniformity and weld strength.",
                ]}
              />
            </div>
          </div>

          <div className="experience-item">
            <img
              src={require("./dlcDarkModeRemovedBackground.png")}
              alt="image not found"
            />
            <div>
              <div className="experience-header">
                <h3>PC Support Intern</h3>
                <p className="date">
                  Duquesne Light Company | May 2021 - August 2022
                </p>
              </div>

              <BulletPoints
                className="bullet-points"
                points={[
                  "Reimaged and configured over 500 PCs to the company standard so they could be distributed to employees.",
                  "Repaired, decommissioned, or updated various Windows OS PCs.",
                  "Solved Cherwell IT support tickets, requiring in-depth computer knowledge and problem-solving skills.",
                  "Communicated efficiently among the PC support team to establish standards and information to provide quality services.",
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
          </div>
            {projectsData.map((project, index) => (
              <ProjectEntry key={index} {...project} />
            ))}

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
