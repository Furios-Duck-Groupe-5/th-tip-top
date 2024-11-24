import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../ConnexionInscription/AuthContext';

const ProtectedRoute: React.FC<{ children: JSX.Element; requiredRole: number }> = ({ children, requiredRole }) => {
  const { isLoggedIn, roleId } = useAuth();

  if (!isLoggedIn) {
    // Redirection vers la page de connexion
    return <Navigate to="/login" replace />;
  }

  if (roleId !== requiredRole) {
    // Redirection vers une page d'accès refusé
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
