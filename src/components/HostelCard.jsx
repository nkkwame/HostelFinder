import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FavoriteIcon, FavoriteBorderIcon, HomeIcon, LocationOnIcon, PaymentsIcon, KitchenIcon, WifiIcon, SecurityIcon, CheckCircleIcon, CancelIcon, StarIcon, VerifiedIcon } from '@mui/icons-material';

const HostelCard = ({ hostel }) => {
  const { user, isAuthenticated, addToFavorites, removeFromFavorites } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const hasVacancy = hostel.totalVacancy > 0;
  const minPrice = Math.min(...hostel.roomTypes.map(room => room.price));
  const isFavorite = user?.favorites?.includes(hostel._id);
  
  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      // Could redirect to login or show a message
      return;
    }
    
    setIsLoading(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(hostel._id);
      } else {
        await addToFavorites(hostel._id);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Hostel Image Placeholder */}
      <div className="h-48 bg-gradient-to-r from-indigo-100 to-indigo-200 flex items-center justify-center relative">
        <HomeIcon className="text-indigo-600 text-4xl" />
        
        {/* Favorite Button */}
        {isAuthenticated && (
          <button
            onClick={handleFavoriteToggle}
            disabled={isLoading}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 disabled:opacity-50"
          >
            {isFavorite ? (
              <FavoriteIcon className="h-5 w-5 text-red-500" />
            ) : (
              <FavoriteBorderIcon className="h-5 w-5 text-gray-600" />
            )}
          </button>
        )}
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {hostel.name}
          </h3>
          {hostel.verified && (
            <VerifiedIcon className="text-green-500 text-sm" />
          )}
        </div>

        {/* Location and Distance */}
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <LocationOnIcon className="text-sm mr-1" />
          <span>{hostel.location}</span>
          <span className="mx-2">•</span>
          <span>{hostel.distanceFromCampus}km from campus</span>
        </div>

        {/* Price Range */}
        <div className="flex items-center text-gray-700 font-medium mb-3">
          <PaymentsIcon className="text-sm mr-1 text-green-600" />
          <span>GH₵{minPrice} - GH₵{hostel.priceRange.max} /semester</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {hostel.amenities.hasKitchen && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              <KitchenIcon className="text-xs mr-1" />
              Kitchen
            </span>
          )}
          {hostel.amenities.hasWifi && (
            <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              <WifiIcon className="text-xs mr-1" />
              WiFi
            </span>
          )}
          {hostel.amenities.hasSecurity && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              <SecurityIcon className="text-xs mr-1" />
              Security
            </span>
          )}
        </div>

        {/* Vacancy Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {hasVacancy ? (
              <CheckCircleIcon className="text-sm mr-1 text-green-600" />
            ) : (
              <CancelIcon className="text-sm mr-1 text-red-600" />
            )}
            <span className={`text-sm font-medium ${hasVacancy ? 'text-green-600' : 'text-red-600'}`}>
              {hasVacancy ? `${hostel.totalVacancy} rooms available` : 'No vacancy'}
            </span>
          </div>
          
          {/* Rating */}
          {hostel.rating.count > 0 && (
            <div className="flex items-center">
              <StarIcon className="text-yellow-500 text-sm" />
              <span className="text-sm text-gray-600 ml-1">
                {hostel.rating.average.toFixed(1)} ({hostel.rating.count})
              </span>
            </div>
          )}
        </div>

        {/* Room Types Preview */}
        <div className="text-xs text-gray-600 mb-4">
          <div className="flex flex-wrap gap-1">
            {hostel.roomTypes.map((room, index) => (
              <span key={index} className="bg-gray-100 px-2 py-1 rounded">
                {room.type}: GH₵{room.price}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/hostel/${hostel._id}`}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HostelCard;
