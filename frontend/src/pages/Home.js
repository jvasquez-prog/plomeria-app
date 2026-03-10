import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">
          🔧 Plomería Confiable
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          Conectamos personas mayores de 50 años con plomeros verificados en CABA
        </p>
        
        <div className="grid md:grid-cols-3 gap-4 mt-12">
          <Link 
            to="/plumbers"
            className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 transition"
          >
            <div className="text-4xl mb-2">👨‍🔧</div>
            <h3 className="text-xl font-bold">Ver Plomeros</h3>
            <p className="text-sm mt-2">Busca profesionales cerca tuyo</p>
          </Link>
          
          <Link 
            to="/request"
            className="bg-green-500 text-white p-6 rounded-lg hover:bg-green-600 transition"
          >
            <div className="text-4xl mb-2">📝</div>
            <h3 className="text-xl font-bold">Solicitar Presupuesto</h3>
            <p className="text-sm mt-2">Describe tu problema</p>
          </Link>
          
          <a 
            href="tel:1155551234"
            className="bg-red-500 text-white p-6 rounded-lg hover:bg-red-600 transition"
          >
            <div className="text-4xl mb-2">📞</div>
            <h3 className="text-xl font-bold">Llamar Ahora</h3>
            <p className="text-sm mt-2">Asistencia inmediata</p>
          </a>
        </div>
        
        <div className="mt-12 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">¿Cómo funciona?</h3>
          <div className="grid md:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-3xl font-bold text-blue-500">1</div>
              <p className="mt-2">Describe tu problema</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500">2</div>
              <p className="mt-2">Recibe presupuestos</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500">3</div>
              <p className="mt-2">Elige el mejor</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-500">4</div>
              <p className="mt-2">¡Listo!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
