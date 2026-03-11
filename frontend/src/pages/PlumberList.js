import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { plumbersAPI } from '../services/api';

function PlumberList() {
  const [plumbers, setPlumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchPlumbers();
  }, []);
  
  const fetchPlumbers = async () => {
    try {
      const response = await plumbersAPI.getAll();
      setPlumbers(response.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Cargando plomeros...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Plomeros Disponibles
        </h1>
        
        {plumbers.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600">
              No hay plomeros disponibles en este momento
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {plumbers.map(plumber => (
              <div 
                key={plumber._id} 
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-4xl flex-shrink-0">
                    👨‍🔧
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {plumber.user?.name || 'Plomero'}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-yellow-500 text-2xl">⭐</span>
                      <span className="text-xl font-semibold">
                        {plumber.stats?.rating?.toFixed(1) || 'N/A'}
                      </span>
                      <span className="text-gray-500">
                        ({plumber.stats?.totalReviews || 0})
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    ✓ Verificado
                  </span>
                  {plumber.experience?.years && (
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {plumber.experience.years} años exp.
                    </span>
                  )}
                </div>
                
                {plumber.serviceAreas && plumber.serviceAreas.length > 0 && (
                  <p className="text-gray-700 mb-4 text-lg">
                    📍 Zona: <strong>{plumber.serviceAreas.map(a => a.neighborhood).join(', ')}</strong>
                  </p>
                )}
                
                <div className="flex gap-3">
                  <a
                    href={`tel:${plumber.user?.phone}`}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-4 rounded-lg font-bold text-lg transition"
                  >
                    📞 LLAMAR
                  </a>
                  <Link
                    to={`/plumber/${plumber._id}`}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-4 rounded-lg font-bold text-lg transition"
                  >
                    VER PERFIL
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlumberList;
