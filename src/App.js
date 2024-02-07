import React, { useState, useEffect } from "react";
import "./App.css";
import StarryBackground from "./starryBackground";
import ProjectEntry from "./projectEntry";
import WelcomeIcons from "./welcomeIcons";
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
const Footer = () => {
  const iconStyle = {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  };

  return (
    <footer style={{ backgroundColor: "#333", padding: "20px 0", textAlign: "center" }} className="footer">
      <div className="footer-icons">
        <a href="https://github.com/jace-roell" target="_blank" rel="noopener noreferrer">
          <img style={iconStyle} src={require("./images/github.png")} alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/jace-roell" target="_blank" rel="noopener noreferrer">
          <img style={iconStyle} src={require("./images/linkedin.png")} alt="LinkedIn" />
        </a>
        <a href="mailto:jace.roell@hotmail.com">
          <img style={iconStyle} src={require("./images/mail.png")} alt="Email" />
        </a>
      </div>
    </footer>
  );
};


const App = () => {
  const [currentSection, setCurrentSection] = useState("");

  const projectsData = [
    {
      imageUrl: require("./images/blackjackExample.png"),
      name: "Live Blackjack Game",
      description:
        "Blackjack game to allow for live competition between users to achieve the highest balance",
      learnMoreHref: "https://github.com/jace-roell/online-blackjack",
      liveAppHref: "./blackjack.html",
      technologies: "HTML, CSS, JavaScript, Socket.io, Heroku",
    },
    {
      imageUrl: require("./images/starlinkExample.PNG"),
      name: "Starlink Satellite Tracker",
      description:
        "Leverages Google and n2yo API to display visible passes of starlink satellites within your area",
      learnMoreHref:
        "https://github.com/jace-roell/https://github.com/jace-roell/starlink-satellite-tracker-public",
      liveAppHref: "",
      technologies: "React.js, JavaScript, HTML, CSS, Python",
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
            <h1>Hello, my name is Jace Roell <WelcomeIcons /></h1>
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
              src={require("./images/ussRemovedBackground.png")}
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
            <img src={require("./images/rmu.png")} alt="image not found" />
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
              src={require("./images/dlcDarkModeRemovedBackground.png")}
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
        <div className="skills-content-container">
        <div className="skills-content">
        <h2>Frameworks</h2>
            <div className="row">
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/react.png")} alt="React Icon" />
                  <p>React.js</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/angular.png")} alt="Angular Icon" />
                  <p>Angular.js</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/dotNet.png")} alt="dotNet Icon" />
                  <p>ASP.Net MVC</p>
                </div>
              </div>
            </div>
          </div>
          <div className="skills-content">
            <h2>Languages</h2>
            <div className="row">
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/html.png")} alt="HTML Icon" />
                  <p>HTML</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/css.png")} alt="CSS Icon" />
                  <p>CSS</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/js.png")} alt="JavaScript Icon" />
                  <p>JavaScript</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/ts.png")} alt="TS Icon" />
                  <p>TypeScript</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/c.png")} alt="C Icon" />
                  <p>C</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/cpp.png")} alt="C++ Icon" />
                  <p>C++</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/cSharp.png")} alt="C# Icon" />
                  <p>C#</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/java2.png")} alt="Java Icon" />
                  <p>Java</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/sql.png")} alt="SQL Dev Icon" />
                  <p>SQL Developer</p>
                </div>
              </div>
            </div>
          </div>
          <div className="skills-content">
          <h2>Tools/Libraries</h2>
            <div className="row">
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/node.png")} alt="Node.js Icon" />
                  <p>Node.js</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/heroku.png")} alt="Heroku Icon" />
                  <p>Heroku</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/knockout.png")} alt="Knockout Icon" />
                  <p>Knockout.js</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/ado.webp")} alt="Azure Dev Ops Icon" />
                  <p>Azure Dev Ops</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/vs.png")} alt="Visual Studio Icon" />
                  <p>Visual Studio</p>
                </div>
              </div>
              <div className="icon-container">
                <div className="column">
                  <img src={require("./images/swagger.png")} alt="Swagger Icon" />
                  <p>Swagger</p>
                </div>
              </div>
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
      <Footer />
    </div>
  );
};

export default App;
