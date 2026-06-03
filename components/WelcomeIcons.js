"use client";

const iconStyle = {
  width: "30px",
  height: "30px",
  marginRight: "10px",
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  marginTop: "10px",
};

export default function WelcomeIcons() {
  return (
    <div style={containerStyle} className="welcome-icons">
      <a
        href="https://github.com/jace-roell"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img style={iconStyle} src="/images/github.png" alt="GitHub" />
      </a>
      <a
        href="https://www.linkedin.com/in/jace-roell"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img style={iconStyle} src="/images/linkedin.png" alt="LinkedIn" />
      </a>
      <a href="mailto:jace.roell@hotmail.com">
        <img style={iconStyle} src="/images/mail.png" alt="Email" />
      </a>
    </div>
  );
}
