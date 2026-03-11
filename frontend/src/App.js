import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PlumberList from './pages/PlumberList';
import PlumberProfile from './pages/PlumberProfile';
import RequestForm from './pages/RequestForm';
import MyRequests from './pages/MyRequests';
import QuoteView from './pages/QuoteView';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plumbers" element={<PlumberList />} />
            <Route path="/plumber/:id" element={<PlumberProfile />} />
            
            <Route 
              path="/request" 
              element={
                <ProtectedRoute>
                  <RequestForm />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/my-requests" 
              element={
                <ProtectedRoute>
                  <MyRequests />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/quote/:id" 
              element={
                <ProtectedRoute>
                  <QuoteView />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
