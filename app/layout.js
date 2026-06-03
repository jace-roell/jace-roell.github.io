import "./globals.css";

export const metadata = {
  title: "Jace Roell Portfolio",
  description:
    "Portfolio website documenting my journey as a software engineer",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
