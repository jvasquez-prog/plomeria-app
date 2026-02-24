import React from 'react';
import { Link } from 'react-router-dom';
import CallButton from './CallButton';

const PlumberCard = ({ plumber }) => {
  const renderStars = (rating) => {
    return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex gap-4 mb-4">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex-shrink-0"></div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-600">
            {plumber.user?.name || 'Nombre no disponible'}
          </h3>
          <div className="text-yellow-500 text-lg">
            {renderStars(plumber.stats?.rating || 0)}
          </div>
          <p className="text-gray-600 text-sm mt-1">
            📍 {plumber.serviceAreas?.[0]?.neighborhood || 'CABA'} • {plumber.experience?.years || 0} años exp.
          </p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {plumber.badges?.map((badge, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4 mt-4 flex gap-3">
        <CallButton
          phoneNumber={plumber.user?.phone}
          className="flex-1 py-3 text-base"
        />
        <Link
          to={`/plumbers/${plumber._id}`}
          className="flex-1 bg-blue-600 text-white text-base font-bold py-3 px-4 rounded-xl hover:bg-blue-700 text-center"
        >
          VER PERFIL
        </Link>
      </div>
    </div>
  );
};

export default PlumberCard;
