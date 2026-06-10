import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import VintageOverlay from "../components/VintageOverlay";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-source",
});

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
    <html lang="en" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body>
        {children}
        <VintageOverlay />
      </body>
    </html>
  );
}
