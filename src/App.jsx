import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import HostelDetailPage from './pages/HostelDetailPage';
import UniversitiesPage from './pages/UniversitiesPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AddHostelPage from './pages/AddHostelPage';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/universities" element={<UniversitiesPage />} />
                <Route path="/hostel/:id" element={<HostelDetailPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/add-hostel" 
                  element={
                    <ProtectedRoute requireRole="hostel_owner">
                      <AddHostelPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
