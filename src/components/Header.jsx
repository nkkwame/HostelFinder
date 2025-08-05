import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import { Person as PersonIcon, Dashboard as DashboardIcon, Home as HomeIcon, Menu as MenuIcon, Close as CloseIcon, Search as SearchIcon, Logout as LogoutIcon, Login as LoginIcon, Add as AddIcon } from '@mui/icons-material';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <HomeIcon className="text-indigo-600 dark:text-indigo-400 text-2xl" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">UCC HostelFinder</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search hostels by name, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
                />
                <SearchIcon className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 h-5 w-5" />
              </div>
            </form>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Home
            </Link>
            <Link to="/universities" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Universities
            </Link>
            <Link to="/search" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium">
              Browse Hostels
            </Link>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium flex items-center"
                >
                  <DashboardIcon className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                
                {(user?.role === 'hostel_owner' || user?.role === 'admin') && (
                  <Link 
                    to="/add-hostel" 
                    className="bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200 flex items-center"
                  >
                    <AddIcon className="h-4 w-4 mr-1" />
                    Add Hostel
                  </Link>
                )}
                
                <div className="flex items-center space-x-2">
                  <PersonIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{user?.name}</span>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 ml-2"
                  >
                    <LogoutIcon className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <Link 
                to="/auth" 
                className="bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200 flex items-center"
              >
                <LoginIcon className="h-4 w-4 mr-1" />
                Sign In
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search hostels..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-400"
              />
              <SearchIcon className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500 h-5 w-5" />
            </div>
          </form>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Hostels
              </Link>
              
              {/* Mobile Theme Toggle */}
              <div className="flex items-center">
                <span className="text-gray-700 dark:text-gray-300 font-medium mr-2">Theme:</span>
                <ThemeToggle />
              </div>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <DashboardIcon className="h-5 w-5 mr-2" />
                    Dashboard
                  </Link>
                  
                  {(user?.role === 'hostel_owner' || user?.role === 'admin') && (
                    <Link 
                      to="/add-hostel" 
                      className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <AddIcon className="h-5 w-5 mr-2" />
                      Add Hostel
                    </Link>
                  )}
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-2">
                      <PersonIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center"
                    >
                      <LogoutIcon className="h-5 w-5 mr-1" />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link 
                  to="/auth" 
                  className="bg-indigo-600 dark:bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200 text-center flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LoginIcon className="h-4 w-4 mr-1" />
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
