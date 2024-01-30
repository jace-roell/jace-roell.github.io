import React, { useState, useEffect } from "react";
import "./App.css";
import StarryBackground from './starryBackground';
import { FaGraduationCap, FaBriefcase, FaCode, FaTools, FaEnvelope, FaArrowDown } from "react-icons/fa";
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

const SectionHeader = ({ icon, title }) => (
  <div className="section-header">
    {icon}
    <h2>{title}</h2>
  </div>
);

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

  const createTrail = (x, y) => {
    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.left = x + "px";
    trail.style.top = y + "px";
    document.body.appendChild(trail);

    setTimeout(() => {
      trail.remove();
    }, 1000);
  };

  return (
    <div className="app">
      
      <div className="welcome-container">
      <StarryBackground />
      <div className="welcome">
        <h1>Hello, my name is Jace Roell</h1>
        <button className="view-portfolio-btn" onClick={() => scrollToSection("education")}>
          View My Portfolio <FaArrowDown />
        </button>
      </div>
    </div>

      <div className="tabs">
        <TabLink
          sectionId="education"
          currentSection={currentSection}
          scrollToSection={scrollToSection}
        >
          <FaGraduationCap /> Education
        </TabLink>
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
          sectionId="contact"
          currentSection={currentSection}
          scrollToSection={scrollToSection}
        >
          <FaEnvelope /> Contact Me
        </TabLink>
      </div>

      <section id="education" className="content-section">
        <SectionHeader icon={<FaGraduationCap />} title="Education" />
        <p>
          Pursuing a Bachelor of Science in Software Engineering with a
          Mechatronics Minor at Robert Morris University, Coraopolis, PA.
          Expected graduation: May 2024. Currently maintaining a GPA of
          3.75/4.00.
        </p>
      </section>

      <section id="experience" className="content-section">
        <SectionHeader icon={<FaBriefcase />} title="Experience" />
        <div>
          <img
            src={require("./uss.png")}
            alt="image not found"
            style={{ width: "175px", height: "auto" }} // Adjust the width as needed
          />
          <h3>Plant Systems Developer Co-op</h3>
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
        <div>
          <img
            src={require("./dlc.jpg")}
            alt="image not found"
            style={{ width: "175px", height: "auto" }} // Adjust the width as needed
          />
          <h3>IT Department Internship/PC Support</h3>
          <BulletPoints
            points={[
              "Reimaged and configured over 500 PCs to the company standard so they could be distributed to employees.",
              "Repaired, decommissioned, or updated various Windows OS PCs.",
              "Solved Cherwell IT support tickets, requiring in-depth computer knowledge and problem-solving skills.",
              "Communicated efficiently among the PC support team to establish standards and information to provide quality services.",
            ]}
          />
        </div>
        <div>
          <img
            src={require("./rmu.png")}
            alt="image not found"
            style={{ width: "175px", height: "auto" }} // Adjust the width as needed
          />
          <h3>Laser Plastic Welding Researcher</h3>
          <BulletPoints
            points={[
              "Collaborated with cross-functional teams to efficiently achieve project objectives.",
              "Demonstrated proficiency in NI LabVIEW for system development and optimization.",
              "Expertly operated thermal cameras to capture and analyze data, facilitating informed decision-making.",
              "Successfully researched and implemented feedback loop systems using WinLase, NI LabVIEW, and PIX Connect to enhance uniformity and weld strength.",
            ]}
          />
        </div>
      </section>
      <section id="projects" className="content-section">
        <SectionHeader icon={<FaCode />} title="Projects" />
        {            <a href="/blackjack.html" target="_blank" rel="noopener noreferrer">
              View Blackjack
            </a>}
      </section>

      <section id="skills" className="content-section">
        <SectionHeader icon={<FaTools />} title="Skills" />
        {/* Add your content for the Skills section here */}
      </section>

      <section id="contact" className="content-section">
        <SectionHeader icon={<FaEnvelope />} title="Contact Me" />
        {/* Add your content for the Contact Me section here */}
      </section>
    </div>
  );
};

export default App;
