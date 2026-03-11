import React from 'react';
import { useParams } from 'react-router-dom';

function PlumberProfile() {
  const { id } = useParams();
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Perfil del Plomero</h1>
        <div className="bg-white rounded-xl shadow p-8">
          <p className="text-lg text-gray-600">
            Funcionalidad completa próximamente... (ID: {id})
          </p>
        </div>
      </div>
    </div>
  );
}

export default PlumberProfile;
