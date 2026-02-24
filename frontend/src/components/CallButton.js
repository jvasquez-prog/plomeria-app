import React from 'react';

const CallButton = ({ phoneNumber, plumberName, className = '' }) => {
  const handleCall = () => {
    // Registrar llamada en analytics
    if (window.gtag) {
      window.gtag('event', 'call_plumber', {
        plumber_name: plumberName,
        phone_number: phoneNumber
      });
    }
  };

  return (
    <a
      href={`tel:${phoneNumber}`}
      onClick={handleCall}
      className={`flex items-center justify-center gap-3 bg-green-500 text-white text-xl font-bold py-5 px-6 rounded-xl hover:bg-green-600 active:bg-green-700 shadow-lg transition-all ${className}`}
      style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0)' }}
    >
      <span className="text-2xl">📞</span>
      <span>LLAMAR AHORA</span>
    </a>
  );
};

export default CallButton;
