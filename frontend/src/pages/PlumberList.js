import React, { useState, useEffect } from 'react';
import { plumbersAPI } from '../services/api';
import PlumberCard from '../components/PlumberCard';

const PlumberList = () => {
  const [plumbers, setPlumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    neighborhood: '',
    rating: ''
  });

  useEffect(() => {
    fetchPlumbers();
  }, [filters]);

  const fetchPlumbers = async () => {
    try {
      setLoading(true);
      const response = await plumbersAPI.getAll(filters);
      setPlumbers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Plomeros en su Zona</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">Barrio</label>
            <input
              type="text"
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg"
              placeholder="🔍 Buscar por barrio..."
              value={filters.neighborhood}
              onChange={(e) => setFilters({ ...filters, neighborhood: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Calificación mínima</label>
            <select
              className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg"
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            >
              <option value="">Todas</option>
              <option value="4">4+ estrellas</option>
              <option value="4.5">4.5+ estrellas</option>
            </select>
          </div>
        </div>
      </div>
      
      {loading ? (
        <p className="text-center text-xl">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plumbers.map((plumber) => (
            <PlumberCard key={plumber._id} plumber={plumber} />
          ))}
        </div>
      )}
      
      {!loading && plumbers.length === 0 && (
        <p className="text-center text-xl text-gray-600">
          No se encontraron plomeros con esos filtros
        </p>
      )}
    </div>
  );
};

export default PlumberList;
