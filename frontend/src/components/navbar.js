import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            🔧 Plomería Confiable
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/plumbers" className="hover:underline text-lg">
              Plomeros
            </Link>
            
            {isAuthenticated ? (
              <>
                {user?.role === 'plumber' && (
                  <Link to="/dashboard" className="hover:underline text-lg">
                    Dashboard
                  </Link>
                )}
                {user?.role === 'user' && (
                  <Link to="/my-requests" className="hover:underline text-lg">
                    Mis Solicitudes
                  </Link>
                )}
                <span className="text-sm">Hola, {user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 text-lg"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 text-lg font-semibold"
                >
                  Ingresar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
