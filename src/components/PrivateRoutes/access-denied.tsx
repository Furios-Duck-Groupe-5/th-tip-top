import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500">
      <section className="flex items-center justify-center min-h-screen px-6 py-12">
      <div className="text-center bg-white rounded-lg shadow-lg p-8 max-w-md w-full -mt-24">
      <p className="text-lg font-medium text-red-600">Erreur 403</p>
          <h1 className="mt-4 text-3xl font-semibold text-gray-800">Accès Refusé</h1>
          <p className="mt-4 text-gray-600">
            Vous n'avez pas l'autorisation d'accéder à cette page.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="px-6 py-3 text-sm text-white bg-red-600 rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Retour à la page d'accueil
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccessDenied;
