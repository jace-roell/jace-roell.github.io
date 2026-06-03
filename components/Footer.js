const iconStyle = {
  width: "30px",
  height: "30px",
  marginRight: "10px",
};

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#333",
        padding: "20px 0",
        textAlign: "center",
      }}
      className="footer"
    >
      <div className="footer-icons">
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
    </footer>
  );
}
