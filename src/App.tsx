import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
// import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import React from "react";
import LoginPage from "./components/ConnexionInscription/Connexion";
import SignUpPage from "./components/ConnexionInscription/inscription";
import ParticipationPage from "./components/Participation/participation";
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              {/* <FeatureSection /> */}
              <Workflow />
              {/* <Pricing /> */}
              <Testimonials />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/participation" element={<ParticipationPage />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
