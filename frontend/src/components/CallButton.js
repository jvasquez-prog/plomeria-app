import React from 'react';

function CallButton({ phone, className = '' }) {
  return (
    <a
      href={`tel:${phone}`}
      className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition ${className}`}
    >
      <span className="text-xl">📞</span>
      Llamar Ahora
    </a>
  );
}

export default CallButton;
