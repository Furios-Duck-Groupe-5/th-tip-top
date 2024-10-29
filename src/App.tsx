import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import React, { PropsWithChildren } from "react";
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
import AddEmployeePage from "./components/Admin/addEmploye";
import EmployeePage from "./components/Employe/employePage";

// Typing the Layout component's props
const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation(); // Hook to get current location
  const hideNavbarAndFooter = location.pathname === "/participation";

  return (
    <>
      {/* Show Navbar only if it's not the participation page */}
      {!hideNavbarAndFooter && <Navbar />}
      <div className="max-w-7xl mx-auto pt-20 px-6">
        {children}
      </div>
      {/* Show Footer only if it's not the participation page */}
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <Workflow />
              <Testimonials />
            </>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mon-compte" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/detailed-statistics" element={<DetailedStatisticsPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/gain" element={<GainsManagementPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<EmployeePage />} />
          <Route path="/lots" element={<LotsPage />} />
          <Route path="/participation" element={<ParticipationPage />} />
          <Route path="/add-employee" element={<AddEmployeePage />} />

        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
