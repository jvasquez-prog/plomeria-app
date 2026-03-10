import React from 'react';
import { Link } from 'react-router-dom';

function PlumberCard({ plumber }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
          👨‍🔧
        </div>
        <div>
          <h3 className="text-xl font-bold">{plumber.user?.name || 'Plomero'}</h3>
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="font-semibold">
              {plumber.stats?.rating?.toFixed(1) || 'N/A'}
            </span>
            <span className="text-gray-500 text-sm">
              ({plumber.stats?.totalReviews || 0} reseñas)
            </span>
          </div>
        </div>
      </div>
      
      {plumber.bio && (
        <p className="text-gray-600 mb-4 line-clamp-2">{plumber.bio}</p>
      )}
      
      {plumber.experience?.years && (
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
            {plumber.experience.years} años de experiencia
          </span>
        </div>
      )}
      
      <div className="flex gap-2">
        <Link
          to={`/plumber/${plumber._id}`}
          className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600"
        >
          Ver Perfil
        </Link>
        <a
          href={`tel:${plumber.user?.phone}`}
          className="flex-1 bg-green-500 text-white text-center py-2 rounded hover:bg-green-600"
        >
          📞 Llamar
        </a>
      </div>
    </div>
  );
}

export default PlumberCard;
