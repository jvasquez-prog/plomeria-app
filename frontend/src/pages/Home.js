import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            🔧 Plomería Confiable
          </h1>
          <p className="text-xl text-white opacity-90">
            Para personas +50 en CABA
          </p>
        </div>

        <div className="space-y-4">
          <a
            href="tel:1155551234"
            className="block w-full bg-green-500 hover:bg-green-600 text-white text-center py-6 rounded-xl font-bold text-2xl shadow-lg transition flex items-center justify-center gap-3"
          >
            <span className="text-3xl">📞</span>
            LLAMAR AHORA
          </a>

          <Link
            to="/request"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center py-6 rounded-xl font-bold text-2xl shadow-lg transition"
          >
            📝 SOLICITAR PRESUPUESTO
          </Link>

          <Link
            to="/plumbers"
            className="block w-full bg-white text-blue-600 text-center py-6 rounded-xl font-bold text-2xl shadow-lg hover:bg-gray-50 transition border-4 border-blue-600"
          >
            👨‍🔧 VER PLOMEROS
          </Link>
        </div>

        <div className="mt-8 bg-blue-100 border-l-4 border-blue-600 p-6 rounded-lg">
          <h3 className="font-bold text-lg mb-3 text-gray-800">
            ✅ ¿Por qué elegirnos?
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Plomeros verificados y con credenciales</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Presupuestos claros sin sorpresas</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Atención especializada para +50</span>
            </li>
            <li className="flex items-start gap-2">
              <span>✓</span>
              <span>Respuesta rápida en tu zona</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h3 className="font-bold text-xl mb-4 text-center text-gray-800">
            ¿Cómo funciona?
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                1
              </div>
              <p className="text-gray-700 text-lg">Describe tu problema</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                2
              </div>
              <p className="text-gray-700 text-lg">Recibe presupuestos</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                3
              </div>
              <p className="text-gray-700 text-lg">Elige el mejor</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                4
              </div>
              <p className="text-gray-700 text-lg">¡Listo!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
