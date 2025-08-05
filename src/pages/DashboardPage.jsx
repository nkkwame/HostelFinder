import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { HomeIcon, AddIcon, EditIcon, DeleteIcon, VisibilityIcon, FavoriteIcon, PersonIcon, LocationOnIcon, AttachMoneyIcon } from '@mui/icons-material';

const DashboardPage = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  
  const [userHostels, setUserHostels] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('hostels');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }
    
    fetchUserData();
  }, [isAuthenticated, navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user's hostels if they're a hostel owner
      if (user?.role === 'hostel_owner' || user?.role === 'admin') {
        const hostelsResponse = await api.get('/hostels/my-hostels');
        setUserHostels(hostelsResponse.data.hostels || []);
      }
      
      // Fetch user's favorites
      if (user?.favorites && user.favorites.length > 0) {
        const favoritesPromises = user.favorites.map(id => 
          api.get(`/hostels/${id}`).catch(() => null)
        );
        const favoritesResponses = await Promise.all(favoritesPromises);
        setFavorites(favoritesResponses.filter(res => res).map(res => res.data));
      }
    } catch (error) {
      console.error('Fetch user data error:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHostel = async (hostelId) => {
    if (!window.confirm('Are you sure you want to delete this hostel? This action cannot be undone.')) {
      return;
    }

    try {
      await api.delete(`/hostels/${hostelId}`);
      setUserHostels(prev => prev.filter(hostel => hostel._id !== hostelId));
    } catch (error) {
      console.error('Delete hostel error:', error);
      alert('Failed to delete hostel');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <PersonIcon className="h-8 w-8 text-indigo-600 mr-3" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome, {user?.name}!
                  </h1>
                  <p className="text-sm text-gray-600 capitalize">
                    {user?.role?.replace('_', ' ')} Dashboard
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                {(user?.role === 'hostel_owner' || user?.role === 'admin') && (
                  <Link
                    to="/add-hostel"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <AddIcon className="h-5 w-5 mr-2" />
                    Add Hostel
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {(user?.role === 'hostel_owner' || user?.role === 'admin') && (
                <button
                  onClick={() => setActiveTab('hostels')}
                  className={`py-2 px-4 border-b-2 font-medium text-sm ${
                    activeTab === 'hostels'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <HomeIcon className="h-5 w-5 inline mr-2" />
                  My Hostels ({userHostels.length})
                </button>
              )}
              <button
                onClick={() => setActiveTab('favorites')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'favorites'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <FavoriteIcon className="h-5 w-5 inline mr-2" />
                Favorites ({favorites.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'hostels' && (user?.role === 'hostel_owner' || user?.role === 'admin') && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Your Hostels</h2>
            </div>

            {userHostels.length === 0 ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <HomeIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No hostels yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding your first hostel listing.
                </p>
                <div className="mt-6">
                  <Link
                    to="/add-hostel"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <AddIcon className="h-5 w-5 mr-2" />
                    Add Your First Hostel
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userHostels.map((hostel) => (
                  <div key={hostel._id} className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {hostel.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          hostel.verified 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {hostel.verified ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-500 flex items-center">
                        <LocationOnIcon className="h-4 w-4 mr-1" />
                        {hostel.location}
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-500 flex items-center">
                        <AttachMoneyIcon className="h-4 w-4 mr-1" />
                        GHS {hostel.priceRange.min} - {hostel.priceRange.max}/month
                      </div>
                      
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {hostel.description}
                      </p>
                      
                      <div className="mt-4 flex justify-between text-sm text-gray-500">
                        <span>Rooms: {hostel.totalVacancy}</span>
                        <span>Rating: {hostel.rating.average.toFixed(1)}/5</span>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 px-6 py-3 flex justify-between">
                      <div className="flex space-x-2">
                        <Link
                          to={`/hostel/${hostel._id}`}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <VisibilityIcon className="h-5 w-5" />
                        </Link>
                        <button className="text-gray-600 hover:text-gray-900">
                          <EditIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <button
                        onClick={() => handleDeleteHostel(hostel._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <DeleteIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Your Favorite Hostels</h2>

            {favorites.length === 0 ? (
              <div className="bg-white shadow rounded-lg p-8 text-center">
                <FavoriteIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No favorites yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Start browsing hostels and add them to your favorites.
                </p>
                <div className="mt-6">
                  <Link
                    to="/search"
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Browse Hostels
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((hostel) => (
                  <div key={hostel._id} className="bg-white shadow rounded-lg overflow-hidden">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {hostel.name}
                      </h3>
                      
                      <div className="mt-2 text-sm text-gray-500 flex items-center">
                        <LocationOnIcon className="h-4 w-4 mr-1" />
                        {hostel.location}
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-500 flex items-center">
                        <AttachMoneyIcon className="h-4 w-4 mr-1" />
                        GHS {hostel.priceRange.min} - {hostel.priceRange.max}/month
                      </div>
                      
                      <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                        {hostel.description}
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 px-6 py-3">
                      <Link
                        to={`/hostel/${hostel._id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
                      >
                        <VisibilityIcon className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
