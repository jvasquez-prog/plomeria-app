import React from 'react';

function App() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>🔧 Plomería Confiable</h1>
      <p>Backend conectado y funcionando</p>
      <p style={{ color: 'green', marginTop: '20px' }}>
        ✅ Frontend deployado exitosamente en Vercel
      </p>
      <div style={{ marginTop: '40px' }}>
        <a 
          href="tel:1155551234"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '15px 30px',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '18px'
          }}
        >
          📞 Llamar Ahora
        </a>
      </div>
    </div>
  );
}

export default App;
