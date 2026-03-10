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
            <Link to="/" className="hover:text-blue-200">
              Inicio
            </Link>
            <Link to="/plumbers" className="hover:text-blue-200">
              Plomeros
            </Link>
            
            {user ? (
              <>
                <Link to="/my-requests" className="hover:text-blue-200">
                  Mis Solicitudes
                </Link>
                <span className="text-sm">
                  Hola, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
                >
                  Ingresar
                </Link>
                <Link 
                  to="/register" 
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
                >
                  Registrarse
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
