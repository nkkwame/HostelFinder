import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HostelCard from '../components/HostelCard';
import UniversitySelector from '../components/UniversitySelector';
import { hostelService } from '../services/api';

const HomePage = () => {
  const [featuredHostels, setFeaturedHostels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState('');

  useEffect(() => {
    fetchFeaturedHostels();
  }, []);

  const fetchFeaturedHostels = async () => {
    try {
      const hostels = await hostelService.getFeaturedHostels();
      setFeaturedHostels(hostels);
    } catch (error) {
      console.error('Error fetching featured hostels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.append('q', searchQuery.trim());
    }
    
    if (selectedUniversity) {
      params.append('university', selectedUniversity);
    }
    
    const queryString = params.toString();
    window.location.href = `/search${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Hostel
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Discover comfortable and affordable accommodation for any university in Ghana
          </p>
          
          {/* University Selector */}
          <div className="max-w-2xl mx-auto mb-6">
            <UniversitySelector
              selectedUniversity={selectedUniversity}
              onUniversityChange={setSelectedUniversity}
              className="mb-4"
            />
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by hostel name, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-lg"
                />
                <span className="material-icons absolute left-4 top-4 text-gray-400 text-2xl">
                  search
                </span>
              </div>
              <button
                type="submit"
                className="bg-white text-primary-600 px-8 py-4 rounded-r-lg hover:bg-gray-50 transition duration-200 font-semibold text-lg"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose UCC HostelFinder?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Your trusted platform for finding student accommodation</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-primary-600 dark:text-primary-400 text-2xl">verified</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Verified Listings</h3>
              <p className="text-gray-600 dark:text-gray-300">All hostels are verified for authenticity and quality standards</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-primary-600 dark:text-primary-400 text-2xl">update</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Real-time Vacancy</h3>
              <p className="text-gray-600 dark:text-gray-300">Get up-to-date information on room availability</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 dark:bg-primary-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-icons text-primary-600 dark:text-primary-400 text-2xl">filter_list</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Smart Filters</h3>
              <p className="text-gray-600 dark:text-gray-300">Filter by price, amenities, location, and room type</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hostels Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Featured Hostels</h2>
              <p className="text-gray-600 dark:text-gray-300">Top-rated hostels with verified amenities</p>
            </div>
            <Link 
              to="/search?featured=true"
              className="bg-primary-600 dark:bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition duration-200"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-96 animate-pulse">
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredHostels.map((hostel) => (
                <HostelCard key={hostel._id} hostel={hostel} />
              ))}
            </div>
          )}

          {!loading && featuredHostels.length === 0 && (
            <div className="text-center py-12">
              <span className="material-icons text-gray-400 dark:text-gray-500 text-6xl mb-4">home</span>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No featured hostels available</h3>
              <p className="text-gray-500 dark:text-gray-400">Check back later or browse all hostels</p>
              <Link 
                to="/search"
                className="inline-block mt-4 bg-primary-600 dark:bg-primary-700 text-white px-6 py-2 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-600 transition duration-200"
              >
                Browse All Hostels
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-200">Verified Hostels</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-primary-200">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-200">Support Available</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
