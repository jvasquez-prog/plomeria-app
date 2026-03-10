import React, { useEffect, useState } from 'react';
import { plumbersAPI } from '../services/api';
import PlumberCard from '../components/PlumberCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function PlumberList() {
  const [plumbers, setPlumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchPlumbers();
  }, []);
  
  const fetchPlumbers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await plumbersAPI.getAll();
      setPlumbers(response.data.data);
    } catch (err) {
      setError('Error al cargar plomeros');
      console.error('Error fetching plumbers:', err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <LoadingSpinner message="Cargando plomeros..." />;
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={fetchPlumbers} />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Plomeros Disponibles</h1>
      
      {plumbers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No hay plomeros disponibles en este momento
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plumbers.map(plumber => (
            <PlumberCard key={plumber._id} plumber={plumber} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PlumberList;
