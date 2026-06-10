"use client";

import { useState, useEffect } from "react";
import "../styles/portfolio.css";
import UkiyoBackground from "./UkiyoBackground";
import GameIntro from "./GameIntro";
import WelcomeIcons from "./WelcomeIcons";
import ProjectEntry from "./ProjectEntry";
import Footer from "./Footer";
import {
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaTools,
  FaArrowDown,
} from "react-icons/fa";

const TabLink = ({ sectionId, currentSection, scrollToSection, children }) => {
  const isActive = currentSection === sectionId;

  return (
    <div
      className={`tab ${isActive ? "active" : ""}`}
      onClick={() => scrollToSection(sectionId)}
    >
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

const projectsData = [
  {
    imageUrl: "/images/blackjackExample.png",
    name: "Live Blackjack Game",
    description:
      "Blackjack game to allow for live competition between users to achieve the highest balance",
    learnMoreHref: "https://github.com/jace-roell/online-blackjack",
    liveAppHref: "/blackjack.html",
    technologies: "HTML, CSS, JavaScript, Socket.io, Heroku",
  },
  {
    imageUrl: "/images/starlinkExample.PNG",
    name: "Starlink Satellite Tracker",
    description:
      "Leverages Google and n2yo API to display visible passes of starlink satellites within your area",
    learnMoreHref:
      "https://github.com/jace-roell/https://github.com/jace-roell/starlink-satellite-tracker-public",
    liveAppHref: "",
    technologies: "React.js, JavaScript, HTML, CSS, Python",
  },
  {
    imageUrl: "",
    name: "Zowe CLI",
    description:
      "Open-source command-line interface for interacting with z/OS and the Zowe ecosystem. Active contributor.",
    learnMoreHref: "https://github.com/zowe/zowe-cli",
    liveAppHref: "",
    technologies: "TypeScript, Node.js, z/OS",
  },
  {
    imageUrl: "",
    name: "Zowe Explorer for VS Code",
    description:
      "VS Code extension for mainframe development — data sets, USS files, jobs, and more. Active contributor.",
    learnMoreHref: "https://github.com/zowe/vscode-extension-for-zowe",
    liveAppHref: "",
    technologies: "TypeScript, VS Code API, z/OS",
  },
  {
    imageUrl: "",
    name: "Zowex",
    description:
      "Native C++ backend and protocol for z/OS mainframe operations over SSH. Active contributor to the CLI plug-in and VS Code integration.",
    learnMoreHref: "https://github.com/zowe/zowex",
    liveAppHref: "",
    technologies: "C++, z/OS, JSON-RPC, SSH",
  },
];

const skillsData = [
  {
    category: "Frameworks",
    items: [
      { name: "React.js", icon: "/images/react.png" },
      { name: "Next.js", icon: "/images/nextjs.svg" },
      { name: "Angular.js", icon: "/images/angular.png" },
      { name: "ASP.Net", icon: "/images/dotNet.png" },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "HTML", icon: "/images/html.png" },
      { name: "CSS", icon: "/images/css.png" },
      { name: "JavaScript", icon: "/images/js.png" },
      { name: "TypeScript", icon: "/images/ts.png" },
      { name: "C++", icon: "/images/cpp.png" },
      { name: "C#", icon: "/images/cSharp.png" },
      { name: "Java", icon: "/images/java2.png" },
      { name: "SQL", icon: "/images/sql.png" },
    ],
  },
  {
    category: "Tools/Libraries",
    items: [
      { name: "Node.js", icon: "/images/node.png" },
      { name: "Heroku", icon: "/images/heroku.png" },
      { name: "Knockout.js", icon: "/images/knockout.png" },
      { name: "Azure Dev Ops", icon: "/images/ado.webp" },
      { name: "Visual Studio", icon: "/images/vs.png" },
      { name: "VS Code", icon: "/images/vscode.svg" },
      { name: "Swagger", icon: "/images/swagger.png" },
    ],
  },
];

const SkillCategory = ({ category, items }) => (
  <div className="skills-category">
    <h3 className="skills-category-title">{category}</h3>
    <div className="skills-items">
      {items.map((skill) => (
        <div className="skill-item" key={skill.name}>
          <div className="skill-icon">
            <img src={skill.icon} alt={`${skill.name} icon`} />
          </div>
          <span className="skill-name">{skill.name}</span>
        </div>
      ))}
    </div>
  </div>
);

export default function Portfolio() {
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
      <nav className="tabs" aria-label="Portfolio sections">
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
      </nav>

      <section id="welcome-no-highlight" className="content-section">
        <div className="welcome-container">
          <UkiyoBackground />
          <div className="welcome">
            <div className="welcome-intro">
              <div className="hero-identity">
                <div className="hero-sun" aria-hidden="true" />
                <div className="hero-identity-content">
                  <h1>
                    <span className="hero-greeting">Hello, my name is</span>
                    <span className="hero-name">Jace Roell</span>
                  </h1>
                  <WelcomeIcons />
                </div>
              </div>
              <button
                className="view-portfolio-btn"
                onClick={() => scrollToSection("experience")}
              >
                See My Portfolio <FaArrowDown />
              </button>
            </div>
            <div className="hero-games">
              <GameIntro />
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="content-section">
        <div className="header-container">
          <div className="section-header">
            <div className="header-background-navy">
              <FaBriefcase className="icon" />
              <h2>Experience</h2>
            </div>
          </div>

          <div className="experience-item">
            <img
              src="/images/ussRemovedBackground.png"
              alt="United States Steel Corporation"
            />
            <div>
              <div className="experience-header">
                <h3>Plant Systems Developer Co-op</h3>
                <p className="date">
                  United States Steel Corporation | May 2023 - Current
                </p>
              </div>
              <BulletPoints
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
            <img src="/images/rmu.png" alt="Robert Morris University" />
            <div>
              <div className="experience-header">
                <h3>Laser Welding Research Intern</h3>
                <p className="date">
                  Robert Morris University | August 2022 - May 2023
                </p>
              </div>
              <BulletPoints
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
              src="/images/dlc.jpg"
              alt="Duquesne Light Company"
            />
            <div>
              <div className="experience-header">
                <h3>PC Support Intern</h3>
                <p className="date">
                  Duquesne Light Company | May 2021 - August 2022
                </p>
              </div>

              <BulletPoints
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
            <div className="header-background-orange">
              <FaCode className="icon" />
              <h2>Projects</h2>
            </div>
          </div>
        </div>
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <ProjectEntry key={index} {...project} />
          ))}
        </div>
      </section>

      <section id="skills" className="content-section">
        <div className="header-container">
          <div className="section-header">
            <div className="header-background-navy">
              <FaTools className="icon" />
              <h2>Skills</h2>
            </div>
          </div>
        </div>
        <div className="skills-grid">
          {skillsData.map((group) => (
            <SkillCategory
              key={group.category}
              category={group.category}
              items={group.items}
            />
          ))}
        </div>
      </section>

      <section id="education" className="content-section">
        <div className="header-container">
          <div className="section-header">
            <div className="header-background-orange">
              <FaGraduationCap className="icon" />
              <h2>Education</h2>
            </div>
          </div>
          <div className="education-details">
            <div className="education-school">
              <h3>Robert Morris University, Coraopolis, PA</h3>
              <p className="degree-info">
                Bachelor of Science in Software Engineering with a minor in
                Mechatronics.
              </p>
              <p className="graduation-info">
                <strong>Graduation Date:</strong> May 2024
              </p>
              <p className="gpa-info">
                <strong>GPA:</strong> 3.75
              </p>
            </div>
            <div className="education-school">
              <h3>South Park High School, South Park, PA</h3>
              <p className="graduation-info">
                <strong>Graduation Date:</strong> May 2020
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
