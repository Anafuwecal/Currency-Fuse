import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Trading from './pages/Trading';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Protected Routes */}
                            <Route path="/" element={
                    <ProtectedRoute>
                      <div className="flex h-screen bg-white">
                        <Sidebar />
                        <main className="flex-1 overflow-auto">
                          <Dashboard />
                        </main>
                      </div>
                    </ProtectedRoute>
                  } />
          
          <Route path="/portfolio" element={
            <ProtectedRoute>
              <div className="flex h-screen bg-white">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Portfolio />
                </main>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/trading" element={
            <ProtectedRoute>
              <div className="flex h-screen bg-white">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Trading />
                </main>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/analytics" element={
            <ProtectedRoute>
              <div className="flex h-screen bg-ash-50">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Analytics />
                </main>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <div className="flex h-screen bg-white">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Profile />
                </main>
              </div>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <div className="flex h-screen bg-white">
                <Sidebar />
                <main className="flex-1 overflow-auto">
                  <Settings />
                </main>
              </div>
            </ProtectedRoute>
          } />
          
          {/* Redirect any unknown routes to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


