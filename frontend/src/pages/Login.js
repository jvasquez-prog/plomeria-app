import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { authAPI } from '../services/api';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await authAPI.login({ phone, password });
      login(response.data.data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Iniciar Sesión
        </h1>
        
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 text-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl px-8 pt-8 pb-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-3">
              Teléfono
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="11 1234-5678"
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-bold mb-3">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg text-xl transition disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'INGRESAR'}
          </button>
          
          <div className="text-center mt-6">
            <Link to="/register" className="text-blue-500 hover:text-blue-700 text-lg">
              ¿No tienes cuenta? Regístrate aquí
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
