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
  const hideNavbarAndFooter = location.pathname === "/participation";
  const hideAdmin = location.pathname === "/admin";

  return (
    <>
      {!hideNavbarAndFooter && !hideAdmin && <Navbar />}
      <div>{children}</div>
      {!hideNavbarAndFooter && !hideAdmin && <Footer />}
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
                  <HeroSection />
                  <Workflow />
                  <Testimonials />
                </>
              } />
              {/* Conditional rendering of Login and Sign Up based on login status */}
              {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
              {!isLoggedIn && <Route path="/signup" element={<SignUpPage />} />}
              <Route path="/mon-compte" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
              <Route path="/detailed-statistics" element={<DetailedStatisticsPage />} />
              <Route path="/users" element={<UserListPage />} />
              <Route path="/gain" element={<GainsManagementPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/lots" element={<LotsPage />} />
              <Route path="/participation" element={<ParticipationPage />} />
              <Route path="/add-employee" element={<AddEmployeePage />} /> 
              <Route path="/employee" element={<EmployeePage />} /> 
              <Route path="/gain-historique" element={<UserGainHistoryPage />} /> 
              </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;
