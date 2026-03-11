import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestsAPI } from '../services/api';

function RequestForm() {
  const [formData, setFormData] = useState({
    problemType: '',
    description: '',
    location: {
      address: {
        neighborhood: ''
      }
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  
  const problemTypes = [
    { value: 'Canilla', icon: '🚰', label: 'Canilla que gotea' },
    { value: 'Inodoro', icon: '🚽', label: 'Problema de inodoro' },
    { value: 'Pérdida', icon: '💧', label: 'Pérdida de agua' },
    { value: 'Destapación', icon: '🔧', label: 'Destapación' },
    { value: 'Instalación', icon: '🔨', label: 'Instalación nueva' },
    { value: 'Otro', icon: '❓', label: 'Otro problema' }
  ];
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await requestsAPI.create(formData);
      navigate('/my-requests');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear solicitud');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Solicitar Presupuesto
        </h1>
        
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-6 text-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8">
          <div className="mb-8">
            <label className="block text-gray-700 text-xl font-bold mb-4">
              ¿Qué tipo de problema tienes?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {problemTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({...formData, problemType: type.value})}
                  className={`p-4 rounded-xl border-3 text-left transition ${
                    formData.problemType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-3xl mb-2">{type.icon}</div>
                  <div className="text-lg font-semibold">{type.label}</div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-3">
              Describe el problema
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows="4"
              placeholder="Ejemplo: La canilla de la cocina gotea constantemente..."
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block text-gray-700 text-lg font-bold mb-3">
              Barrio
            </label>
            <input
              type="text"
              value={formData.location.address.neighborhood}
              onChange={(e) => setFormData({
                ...formData,
                location: {
                  address: {
                    neighborhood: e.target.value
                  }
                }
              })}
              className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Ej: Palermo, Recoleta, Belgrano..."
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !formData.problemType}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg text-xl transition disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'ENVIAR SOLICITUD'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RequestForm;
