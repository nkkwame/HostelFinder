import React from 'react';
import { Link } from 'react-router-dom';

const HostelCard = ({ hostel }) => {
  const hasVacancy = hostel.totalVacancy > 0;
  const minPrice = Math.min(...hostel.roomTypes.map(room => room.price));
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Hostel Image Placeholder */}
      <div className="h-48 bg-gradient-to-r from-primary-100 to-primary-200 flex items-center justify-center">
        <span className="material-icons text-primary-600 text-4xl">home</span>
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {hostel.name}
          </h3>
          {hostel.verified && (
            <span className="material-icons text-green-500 text-sm">verified</span>
          )}
        </div>

        {/* Location and Distance */}
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span className="material-icons text-sm mr-1">location_on</span>
          <span>{hostel.location}</span>
          <span className="mx-2">•</span>
          <span>{hostel.distanceFromCampus}km from campus</span>
        </div>

        {/* Price Range */}
        <div className="flex items-center text-gray-700 font-medium mb-3">
          <span className="material-icons text-sm mr-1 text-green-600">payments</span>
          <span>GH₵{minPrice} - GH₵{hostel.priceRange.max} /semester</span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {hostel.amenities.hasKitchen && (
            <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              <span className="material-icons text-xs mr-1">kitchen</span>
              Kitchen
            </span>
          )}
          {hostel.amenities.hasWifi && (
            <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              <span className="material-icons text-xs mr-1">wifi</span>
              WiFi
            </span>
          )}
          {hostel.amenities.hasSecurity && (
            <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              <span className="material-icons text-xs mr-1">security</span>
              Security
            </span>
          )}
        </div>

        {/* Vacancy Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className={`material-icons text-sm mr-1 ${hasVacancy ? 'text-green-600' : 'text-red-600'}`}>
              {hasVacancy ? 'check_circle' : 'cancel'}
            </span>
            <span className={`text-sm font-medium ${hasVacancy ? 'text-green-600' : 'text-red-600'}`}>
              {hasVacancy ? `${hostel.totalVacancy} rooms available` : 'No vacancy'}
            </span>
          </div>
          
          {/* Rating */}
          {hostel.rating.count > 0 && (
            <div className="flex items-center">
              <span className="material-icons text-yellow-500 text-sm">star</span>
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
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition duration-200 text-center block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default HostelCard;
