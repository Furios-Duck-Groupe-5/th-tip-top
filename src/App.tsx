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
import { AuthProvider, useAuth } from "./components/ConnexionInscription/AuthContext";
import UserGainHistoryPage from "./components/Page-de-profil/historique";
//import HistoriqueGain from "./config/Historique-gain";
import GrandTiragePage from "./components/Admin/grand-tirage";
import EmployeePrizePage from "./components/Employe/employee";
import CookieConsentBanner from "./components/cookies";
import LegalMentions from "./components/CGU/mentions";
import TermsOfUse from "./components/CGU/cgu";
import PrivacyPolicy from "./components/CGU/politique";
import ExplanationPage from "./components/Participation/explication";

import LoginPage from "./components/ConnexionInscription/Connexion";
import SignUpPage from "./components/ConnexionInscription/inscription";
import ProfilePage from "./components/Page-de-profil/page-de-profil";
import AdminPage from "./components/Admin/admin";
import React, { PropsWithChildren } from "react";
import NotFound from "./404";
import AccessDenied from "./components/PrivateRoutes/access-denied";

const ProtectedRoute: React.FC<{ children: JSX.Element; requiredRoles: number[] }> = ({ children, requiredRoles }) => {
  const { isLoggedIn, roleId } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (roleId === null || !requiredRoles.includes(roleId)) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation();
  const hideAdmin = location.pathname === "/admin";
  const hideEmployee = location.pathname === "/page-employee";

  const isParticipationPage = location.pathname === "/apropos";
  const isLogin = location.pathname === "/login";
  const isSignup = location.pathname === "/signup";

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title> Thé tip top concours</title>
        <meta name="description" content="Participez au concours Thé Tip Top et tentez de gagner des lots exclusifs. Découvrez notre sélection de thés biologiques et uniques." />
        <meta name="keywords" content="thé, concours, lots, bio, infusion, exclusifs" />
        <meta property="og:title" content="Concours Thé Tip Top" />
        <meta property="og:description" content="Rejoignez notre concours de thé et gagnez des cadeaux uniques." />
        <script type="application/ld+json">
    {`
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Thé Tip Top",
      "url": "https://dsp5-archi-o23-15m-g5.fr/",
      "logo": "https://dsp5-archi-o23-15m-g5.fr/src/assets/The_TIPTOP2-removebg-preview2.png",
      "description": "Participez au concours Thé Tip Top et découvrez des thés uniques.",
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61568576166989",
        "https://www.instagram.com/thetiptop__/",

      ]
    }
    `}
  </script>
      </Helmet>
      {!hideAdmin && !hideEmployee && <Navbar />}
      <div className={isParticipationPage || isLogin || isSignup ? "pt-20" : ""}>
        {children}
      </div>
      {!hideAdmin && !hideEmployee && <Footer />}
    </>
  );
};

const App: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <Layout>
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
            {/* About Us Page  */}
            <Route path="/apropos" element={
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
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/lots" element={<LotsPage />} />

            <Route path="/mentions-légales" element={<LegalMentions />} />
            <Route path="/cgu" element={<TermsOfUse />} />
            <Route path="/politique-de-confidentialité" element={<PrivacyPolicy />} />
            <Route path="/explication" element={<ExplanationPage />} />

            {/* Pages protégées par rôle */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRoles={[2]}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/detailed-statistics"
              element={
                <ProtectedRoute requiredRoles={[2]}>
                  <DetailedStatisticsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute requiredRoles={[2]}>
                  <UserListPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-employe"
              element={
                <ProtectedRoute requiredRoles={[2]}>
                  <AddEmployeePage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/grand-tirage"
              element={
                <ProtectedRoute requiredRoles={[2]}>
                  <GrandTiragePage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/employee"
              element={
                <ProtectedRoute requiredRoles={[3]}>
                  <EmployeePrizePage />
                </ProtectedRoute>
              }
            />


            <Route
              path="/mon-compte"
              element={
                <ProtectedRoute requiredRoles={[1, 2, 3]}>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/gain-historique"
              element={
                <ProtectedRoute requiredRoles={[1]}>
                  <UserGainHistoryPage />
                </ProtectedRoute>
              }
            />


            {/* Pages d'erreur et accès refusé */}
            <Route path="/access-denied" element={<AccessDenied />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
        <CookieConsentBanner />
      </Router>
    </AuthProvider>
  );
};

export default App;