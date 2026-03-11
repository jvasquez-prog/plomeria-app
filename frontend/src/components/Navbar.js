import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Navbar() {
  const { user, logout } = useAuthStore();
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            🔧 Plomería Confiable
          </Link>
          
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link to="/my-requests" className="hover:text-blue-200 text-lg">
                  Mis Solicitudes
                </Link>
                <span className="text-lg">
                  Hola, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-lg font-semibold"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50 font-semibold"
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
}

export default Navbar;
