import { Helmet } from "react-helmet"; // Importer react-helmet
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Workflow from "./components/Workflow";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import ParticipationPage from "./components/Participation/participation";
import DetailedStatisticsPage from "./components/Admin/statistics-page";
import UserListPage from "./components/Admin/users-page";
import GainsManagementPage from "./components/Participation/GainsManagementPage";
import ContactPage from "./components/Contact/contact";
import BlogPage from "./components/Blog/blog";
import LotsPage from "./components/Participation/Lots";
import AddEmployeePage from "./components/Admin/addEmploye";
import EmployeePage from "./components/Employe/employePage";
import React, { PropsWithChildren, lazy, Suspense } from "react";
import { AuthProvider, useAuth } from "./components/ConnexionInscription/AuthContext";
import UserGainHistoryPage from "./components/Pade de profil/historique";
import HistoriqueGain from "./config/Historique-gain";
import GrandTiragePage from "./components/Admin/grand-tirage";
import EmployeePrizePage from "./components/Employe/employee";
import CookieConsentBanner from "./components/cookies";
import LegalMentions from "./components/CGU/mentions";
import TermsOfUse from "./components/CGU/cgu";
import PrivacyPolicy from "./components/CGU/politique";
import ExplanationPage from "./components/Participation/explication";
// Lazy-loaded components
const LoginPage = lazy(() => import("./components/ConnexionInscription/Connexion"));
const SignUpPage = lazy(() => import("./components/ConnexionInscription/inscription"));
const ProfilePage = lazy(() => import("./components/Pade de profil/page-de-profil"));
const AdminPage = lazy(() => import("./components/Admin/admin"));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Layout component to control Navbar and Footer display
const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/";
  const hideAdmin = location.pathname === "/admin";
  const hideEmployee = location.pathname === "/page-employee"
  
  const isParticipationPage = location.pathname === "/participation";
  const islogin = location.pathname === "/login";
  const issignup = location.pathname === "/signup";

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Mon Application Thé tip top concours</title>
        <meta name="description" content="Description de l'application" />
      </Helmet>
      {  !hideAdmin && !hideEmployee && <Navbar />}
      <div className={isParticipationPage ||islogin || issignup ? "pt-20" : ""}>
        {children}
      </div>
      {!hideNavbarAndFooter && !hideAdmin && !hideEmployee && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route path="/" element={
                <>
                  <Helmet>
                    <title>Accueil - Mon Application</title>
                    <meta name="description" content="Page d'accueil de notre application React." />
                  </Helmet>
                  <ParticipationPage />
                </>
              } />
                  {/* About Us Page (Qui sommes nous) */}
                  <Route path="/participation" element={
                <>
                  <Helmet>
                    <title>Qui sommes-nous - Mon Application</title>
                    <meta name="description" content="Découvrez notre entreprise et notre équipe." />
                  </Helmet>
                  <HeroSection />
                  <Workflow />
                  <Testimonials />
                </>
              } />
              {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
              {!isLoggedIn && <Route path="/signup" element={<SignUpPage />} />}
              <Route path="/mon-compte" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
              <Route path="/detailed-statistics" element={<DetailedStatisticsPage />} />
              <Route path="/users" element={<UserListPage />} />
              <Route path="/page-employee" element={<EmployeePrizePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/lots" element={<LotsPage />} />
              <Route path="/add-employee" element={<AddEmployeePage />} /> 
              <Route path="/employee" element={<EmployeePrizePage />} /> 
              <Route path="/gain-historique" element={<UserGainHistoryPage />} /> 
              <Route path="/grand-tirage" element={<GrandTiragePage />} /> 
              <Route path="/mentions-légales" element={<LegalMentions />} /> 
              <Route path="/cgu" element={<TermsOfUse />} /> 
              <Route path="/politique-de-confidentialité" element={<PrivacyPolicy />} /> 
              <Route path="/explication" element={<ExplanationPage />} /> 



            </Routes>
          </Suspense>
        </Layout>
        <CookieConsentBanner /> 

      </Router>
    </AuthProvider>
  );
};

export default App;
