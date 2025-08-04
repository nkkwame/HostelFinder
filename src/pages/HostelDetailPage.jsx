import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { hostelService } from '../services/api';

const HostelDetailPage = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHostelDetails();
  }, [id]);

  const fetchHostelDetails = async () => {
    try {
      const data = await hostelService.getHostelById(id);
      setHostel(data);
    } catch (error) {
      console.error('Error fetching hostel details:', error);
      setError('Failed to load hostel details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hostel details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons text-red-500 text-6xl mb-4">error</span>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/search"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition duration-200"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  if (!hostel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="material-icons text-gray-400 text-6xl mb-4">home</span>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Hostel Not Found</h2>
          <p className="text-gray-600 mb-6">The hostel you're looking for doesn't exist.</p>
          <Link 
            to="/search"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition duration-200"
          >
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const hasVacancy = hostel.totalVacancy > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/search" className="text-gray-500 hover:text-primary-600">Search</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{hostel.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hostel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span className="material-icons text-sm mr-1">location_on</span>
                    <span>{hostel.location}</span>
                    <span className="mx-2">•</span>
                    <span>{hostel.distanceFromCampus}km from campus</span>
                  </div>
                </div>
                {hostel.verified && (
                  <div className="flex items-center text-green-600">
                    <span className="material-icons mr-1">verified</span>
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              {hostel.rating.count > 0 && (
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <span 
                        key={i} 
                        className={`material-icons text-sm ${
                          i < Math.floor(hostel.rating.average) ? 'text-yellow-500' : 'text-gray-300'
                        }`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {hostel.rating.average.toFixed(1)} ({hostel.rating.count} reviews)
                  </span>
                </div>
              )}

              {/* Vacancy Status */}
              <div className="flex items-center">
                <span className={`material-icons mr-2 ${hasVacancy ? 'text-green-600' : 'text-red-600'}`}>
                  {hasVacancy ? 'check_circle' : 'cancel'}
                </span>
                <span className={`font-medium ${hasVacancy ? 'text-green-600' : 'text-red-600'}`}>
                  {hasVacancy ? `${hostel.totalVacancy} rooms available` : 'No vacancy available'}
                </span>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
              <div className="bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <span className="material-icons text-primary-600 text-6xl mb-2">photo_camera</span>
                  <p className="text-primary-700">Photos coming soon</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{hostel.description}</p>
            </div>

            {/* Room Types */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Room Types & Pricing</h2>
              <div className="space-y-4">
                {hostel.roomTypes.map((room, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-gray-900 capitalize">{room.type}</h3>
                        <p className="text-2xl font-bold text-primary-600 mt-1">
                          GH₵{room.price}
                          <span className="text-sm text-gray-500 font-normal">/semester</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className={`flex items-center mb-1 ${room.available > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          <span className="material-icons text-sm mr-1">
                            {room.available > 0 ? 'check_circle' : 'cancel'}
                          </span>
                          <span className="font-medium">
                            {room.available > 0 ? `${room.available} available` : 'Not available'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(hostel.amenities).map(([key, value]) => {
                  const amenityIcons = {
                    hasKitchen: 'kitchen',
                    hasWifi: 'wifi',
                    hasParking: 'local_parking',
                    hasLaundry: 'local_laundry_service',
                    hasStudyRoom: 'menu_book',
                    hasSecurity: 'security'
                  };
                  
                  const amenityNames = {
                    hasKitchen: 'Kitchen',
                    hasWifi: 'WiFi',
                    hasParking: 'Parking',
                    hasLaundry: 'Laundry',
                    hasStudyRoom: 'Study Room',
                    hasSecurity: 'Security'
                  };

                  return (
                    <div key={key} className={`flex items-center p-3 rounded-lg ${
                      value ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-500'
                    }`}>
                      <span className={`material-icons mr-2 ${value ? 'text-green-600' : 'text-gray-400'}`}>
                        {value ? amenityIcons[key] : 'close'}
                      </span>
                      <span className="font-medium">{amenityNames[key]}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rules */}
            {hostel.rules && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">House Rules</h2>
                <div className="space-y-3">
                  {hostel.rules.noSmoking !== undefined && (
                    <div className="flex items-center">
                      <span className={`material-icons mr-2 ${hostel.rules.noSmoking ? 'text-red-600' : 'text-green-600'}`}>
                        {hostel.rules.noSmoking ? 'smoke_free' : 'smoking_rooms'}
                      </span>
                      <span>{hostel.rules.noSmoking ? 'No smoking allowed' : 'Smoking allowed'}</span>
                    </div>
                  )}
                  {hostel.rules.noPets !== undefined && (
                    <div className="flex items-center">
                      <span className={`material-icons mr-2 ${hostel.rules.noPets ? 'text-red-600' : 'text-green-600'}`}>
                        pets
                      </span>
                      <span>{hostel.rules.noPets ? 'No pets allowed' : 'Pets allowed'}</span>
                    </div>
                  )}
                  {hostel.rules.quietHours && (
                    <div className="flex items-center">
                      <span className="material-icons mr-2 text-blue-600">bedtime</span>
                      <span>Quiet hours: {hostel.rules.quietHours}</span>
                    </div>
                  )}
                  {hostel.rules.guestPolicy && (
                    <div className="flex items-center">
                      <span className="material-icons mr-2 text-purple-600">group</span>
                      <span>Guest policy: {hostel.rules.guestPolicy}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              
              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Range</h3>
                <div className="text-2xl font-bold text-primary-600">
                  GH₵{hostel.priceRange.min} - GH₵{hostel.priceRange.max}
                </div>
                <p className="text-sm text-gray-500">per semester</p>
              </div>

              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="material-icons text-green-600 mr-3">phone</span>
                    <a 
                      href={`tel:${hostel.contact.phone}`}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      {hostel.contact.phone}
                    </a>
                  </div>
                  
                  {hostel.contact.whatsapp && (
                    <div className="flex items-center">
                      <span className="material-icons text-green-600 mr-3">chat</span>
                      <a 
                        href={`https://wa.me/${hostel.contact.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        WhatsApp: {hostel.contact.whatsapp}
                      </a>
                    </div>
                  )}
                  
                  {hostel.contact.email && (
                    <div className="flex items-center">
                      <span className="material-icons text-blue-600 mr-3">email</span>
                      <a 
                        href={`mailto:${hostel.contact.email}`}
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {hostel.contact.email}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {hostel.contact.whatsapp && (
                  <a
                    href={`https://wa.me/${hostel.contact.whatsapp.replace(/\D/g, '')}?text=Hi, I'm interested in your hostel: ${hostel.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center"
                  >
                    <span className="material-icons mr-2">chat</span>
                    Chat on WhatsApp
                  </a>
                )}
                
                <a
                  href={`tel:${hostel.contact.phone}`}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition duration-200 flex items-center justify-center"
                >
                  <span className="material-icons mr-2">phone</span>
                  Call Now
                </a>
                
                {hostel.contact.email && (
                  <a
                    href={`mailto:${hostel.contact.email}?subject=Inquiry about ${hostel.name}`}
                    className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition duration-200 flex items-center justify-center"
                  >
                    <span className="material-icons mr-2">email</span>
                    Send Email
                  </a>
                )}
              </div>

              {/* Back to Search */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  to="/search"
                  className="w-full bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center"
                >
                  <span className="material-icons mr-2">arrow_back</span>
                  Back to Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetailPage;
