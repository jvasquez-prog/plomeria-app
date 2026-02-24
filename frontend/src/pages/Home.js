import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-7xl mb-6">🔧</div>
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          ¿Necesita un plomero?
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Profesionales verificados en su barrio
        </p>
        
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <a
            href="tel:1150000000"
            className="flex items-center justify-center gap-3 bg-green-500 text-white text-2xl font-bold py-6 rounded-xl hover:bg-green-600 shadow-lg"
          >
            <span className="text-3xl">📞</span>
            LLAMAR AHORA
          </a>
          
          <Link
            to="/request"
            className="bg-blue-600 text-white text-2xl font-bold py-6 rounded-xl hover:bg-blue-700 shadow-lg"
          >
            SOLICITAR PRESUPUESTO
          </Link>
          
          <Link
            to="/plumbers"
            className="bg-white text-blue-600 border-4 border-blue-600 text-2xl font-bold py-6 rounded-xl hover:bg-blue-50 shadow-lg"
          >
            VER PLOMEROS CERCANOS
          </Link>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-lg p-8 max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">
          ✓ Garantía de Confianza
        </h3>
        <ul className="text-xl space-y-2 text-gray-700">
          <li>✓ Sin costo hasta contratar</li>
          <li>✓ Presupuestos por escrito</li>
          <li>✓ Profesionales con credenciales verificadas</li>
          <li>✓ Transparencia total en los precios</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
