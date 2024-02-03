import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const WelcomeIcons = () => {
  const iconStyle = {
    width: "30px",
    height: "30px",
    marginRight: "10px",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px", // Add margin for spacing, adjust as needed
  };

  return (
    <div style={containerStyle} className="welcome-icons">
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
  );
};

export default WelcomeIcons;
