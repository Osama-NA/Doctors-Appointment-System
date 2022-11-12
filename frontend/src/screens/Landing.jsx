import React from "react";
// Sections
import TopNavbar from "../components/Nav/TopNavbar";
import Header from "../components/Sections/Header";
import Service from "../components/Sections/Service";
import Doctors from "../components/Sections/Doctors";
import Contact from "../components/Sections/Contact";
import Footer from "../components/Sections/Footer"

export default function Landing() {
  return (
    <>
      <TopNavbar auth={false} />
      <Header />
      <Service />
      <Doctors />
      <Contact />
      <Footer />
    </>
  );
}