import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main style={{ padding: "1rem" }}>{children}</main>
      <Footer />
    </div>
  );
}
