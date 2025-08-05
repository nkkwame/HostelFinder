import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UniversitySelector from '../components/UniversitySelector';
import api from '../services/api';
import { Home as HomeIcon, LocationOn as LocationOnIcon, Phone as PhoneIcon, Email as EmailIcon, AttachMoney as AttachMoneyIcon, Wifi as WifiIcon, Kitchen as KitchenIcon, LocalParking as LocalParkingIcon, Security as SecurityIcon, LocalLaundryService as LocalLaundryServiceIcon, Book as BookIcon } from '@mui/icons-material';

const AddHostelPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    university: '',
    location: '',
    distanceFromCampus: '',
    priceRange: {
      min: '',
      max: ''
    },
    roomTypes: [
      { type: '1 room 1 meter', price: '', available: '' }
    ],
    amenities: {
      hasKitchen: false,
      hasWifi: false,
      hasParking: false,
      hasLaundry: false,
      hasStudyRoom: false,
      hasSecurity: false
    },
    contact: {
      phone: '',
      email: '',
      whatsapp: ''
    },
    rules: {
      noSmoking: false,
      noPets: false,
      quietHours: '',
      guestPolicy: ''
    },
    images: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if not authenticated or not a hostel owner
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { state: { from: { pathname: '/add-hostel' } } });
    } else if (user && user.role !== 'hostel_owner' && user.role !== 'admin') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleRoomTypeChange = (index, field, value) => {
    const updatedRoomTypes = [...formData.roomTypes];
    updatedRoomTypes[index] = {
      ...updatedRoomTypes[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      roomTypes: updatedRoomTypes
    }));
  };

  const addRoomType = () => {
    setFormData(prev => ({
      ...prev,
      roomTypes: [
        ...prev.roomTypes,
        { type: 'shared', price: '', available: '' }
      ]
    }));
  };

  const removeRoomType = (index) => {
    if (formData.roomTypes.length > 1) {
      const updatedRoomTypes = formData.roomTypes.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        roomTypes: updatedRoomTypes
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      if (!formData.name || !formData.description || !formData.location) {
        throw new Error('Please fill in all required fields');
      }

      // Calculate price range from room types
      const prices = formData.roomTypes.map(room => Number(room.price)).filter(price => price > 0);
      if (prices.length === 0) {
        throw new Error('Please add at least one room type with a price');
      }

      const finalData = {
        ...formData,
        distanceFromCampus: Number(formData.distanceFromCampus),
        priceRange: {
          min: Math.min(...prices),
          max: Math.max(...prices)
        },
        roomTypes: formData.roomTypes.map(room => ({
          ...room,
          price: Number(room.price),
          available: Number(room.available)
        }))
      };

      const response = await api.post('/hostels', finalData);

      if (response.data.success) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Create hostel error:', error);
      setError(error.response?.data?.message || error.message || 'Failed to create hostel');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || (user && user.role !== 'hostel_owner' && user.role !== 'admin')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <HomeIcon className="mr-3 h-8 w-8 text-indigo-600" />
              Add New Hostel
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              List your hostel to help students find accommodation at any university in Ghana
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Hostel Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter hostel name"
                  />
                </div>

                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                    University *
                  </label>
                  <UniversitySelector
                    selectedUniversity={formData.university}
                    onUniversityChange={(universityId) => 
                      setFormData(prev => ({ ...prev, university: universityId }))
                    }
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                    Location *
                  </label>
                  <div className="mt-1 relative">
                    <LocationOnIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="e.g., Adisadel, Amamoma"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="distanceFromCampus" className="block text-sm font-medium text-gray-700">
                    Distance from Campus (km) *
                  </label>
                  <input
                    type="number"
                    id="distanceFromCampus"
                    name="distanceFromCampus"
                    required
                    min="0"
                    step="0.1"
                    value={formData.distanceFromCampus}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., 2.5"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  required
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Describe your hostel, its features, and what makes it special..."
                />
              </div>

              <div>
                <label htmlFor="distanceFromCampus" className="block text-sm font-medium text-gray-700">
                  Distance from Campus (km)
                </label>
                <input
                  type="number"
                  id="distanceFromCampus"
                  name="distanceFromCampus"
                  step="0.1"
                  min="0"
                  value={formData.distanceFromCampus}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 2.5"
                />
              </div>
            </div>

            {/* Room Types */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Room Types & Pricing</h3>
              
              {formData.roomTypes.map((room, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium text-gray-900">Room Type {index + 1}</h4>
                    {formData.roomTypes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRoomType(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        value={room.type}
                        onChange={(e) => handleRoomTypeChange(index, 'type', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      >
                        <option value="1 room 1 meter">1 Room 1 Meter</option>
                        <option value="shared">Shared Room</option>
                        <option value="single">Single Room</option>
                        <option value="double">Double Room</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price (GHS/month)</label>
                      <div className="mt-1 relative">
                        <AttachMoneyIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          min="0"
                          value={room.price}
                          onChange={(e) => handleRoomTypeChange(index, 'price', e.target.value)}
                          className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                          placeholder="500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Available Rooms</label>
                      <input
                        type="number"
                        min="0"
                        value={room.available}
                        onChange={(e) => handleRoomTypeChange(index, 'available', e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="5"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button
                type="button"
                onClick={addRoomType}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add Another Room Type
              </button>
            </div>

            {/* Amenities */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Amenities</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { key: 'hasKitchen', label: 'Kitchen', icon: KitchenIcon },
                  { key: 'hasWifi', label: 'WiFi', icon: WifiIcon },
                  { key: 'hasParking', label: 'Parking', icon: LocalParkingIcon },
                  { key: 'hasLaundry', label: 'Laundry', icon: LocalLaundryServiceIcon },
                  { key: 'hasStudyRoom', label: 'Study Room', icon: BookIcon },
                  { key: 'hasSecurity', label: 'Security', icon: SecurityIcon }
                ].map(({ key, label, icon: Icon }) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      id={key}
                      name={`amenities.${key}`}
                      checked={formData.amenities[key]}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={key} className="ml-3 flex items-center text-sm font-medium text-gray-700">
                      <Icon className="mr-2 h-5 w-5 text-gray-500" />
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="contact.phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <PhoneIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="contact.phone"
                      name="contact.phone"
                      value={formData.contact.phone}
                      onChange={handleInputChange}
                      className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact.email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1 relative">
                    <EmailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="contact.email"
                      name="contact.email"
                      value={formData.contact.email}
                      onChange={handleInputChange}
                      className="block w-full pl-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="contact@hostel.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact.whatsapp" className="block text-sm font-medium text-gray-700">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="contact.whatsapp"
                    name="contact.whatsapp"
                    value={formData.contact.whatsapp}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="+233 XX XXX XXXX"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Hostel'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddHostelPage;
