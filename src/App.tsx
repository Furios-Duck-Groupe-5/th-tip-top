import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
 import FeatureSection from "./components/FeatureSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import React from "react";
import LoginPage from "./components/ConnexionInscription/Connexion";
import SignUpPage from "./components/ConnexionInscription/inscription";
import ParticipationPage from "./components/Participation/participation";
import ProfilePage from "./components/Pade de profil/page-de-profil";
import AdminPage from "./components/Admin/admin";
import DetailedStatisticsPage from "./components/Admin/statistics-page";
import UserListPage from "./components/Admin/users-page";
import GainsManagementPage from "./components/Participation/GainsManagementPage";
import ContactPage from "./components/Contact/contact";
import BlogPage from "./components/Blog/blog";
import LotsPage from "./components/Participation/Lots";
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
          <Route path="/mon-compte" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/detailed-statistics" element={<DetailedStatisticsPage/>} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/gain" element={<GainsManagementPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/lots" element={<LotsPage />} /> 
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
