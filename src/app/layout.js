import localFont from "next/font/local";
import BottomBar from "./components/BottomBar";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "UCR - Ultra Camp Runners",
  description: "Your Ultimate Marathon Adventure Begins at Ultra Camp Runners!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar/>
        {children}
        <Footer/>
        <BottomBar/>
      </body>
    </html>
  );
}
