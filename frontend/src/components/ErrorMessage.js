import React from 'react';

function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-4xl mb-2">⚠️</div>
      <h3 className="text-xl font-bold text-red-800 mb-2">Error</h3>
      <p className="text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
