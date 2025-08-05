import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { universityService } from '../services/api';
import { School as SchoolIcon, LocationOn as LocationOnIcon, Language as LanguageIcon, CalendarToday as CalendarTodayIcon, Category as CategoryIcon } from '@mui/icons-material';

const UniversitiesPage = () => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        try {
            const data = await universityService.getUniversities({ active: true });
            setUniversities(data);
        } catch (error) {
            console.error('Error fetching universities:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredUniversities = universities.filter(uni => {
        const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            uni.location.city.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesType = filter === 'all' || uni.type === filter;
        const matchesRegion = !selectedRegion || uni.location.region === selectedRegion;
        
        return matchesSearch && matchesType && matchesRegion;
    });

    const regions = [...new Set(universities.map(uni => uni.location.region))].sort();

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-64 animate-pulse">
                                <div className="p-6 space-y-4">
                                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Universities in Ghana
                    </h1>
                    <p className="text-xl text-indigo-100 mb-8">
                        Discover accommodation options for universities across Ghana
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8 border dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Search Universities
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or location..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {/* Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                University Type
                            </label>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="Public">Public</option>
                                <option value="Private">Private</option>
                                <option value="Technical">Technical</option>
                            </select>
                        </div>

                        {/* Region Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Region
                            </label>
                            <select
                                value={selectedRegion}
                                onChange={(e) => setSelectedRegion(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            >
                                <option value="">All Regions</option>
                                {regions.map(region => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300">
                        {filteredUniversities.length} universities found
                        {filter !== 'all' && ` • Filtered by: ${filter} universities`}
                        {selectedRegion && ` • Region: ${selectedRegion}`}
                    </p>
                </div>

                {/* Universities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUniversities.map((university) => (
                        <div key={university._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border dark:border-gray-700">
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-600 dark:text-indigo-400 font-bold text-sm">
                                                    {university.shortName}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                                                {university.name}
                                            </h3>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                        university.type === 'Public' 
                                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                                            : university.type === 'Private'
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                                            : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                                    }`}>
                                        {university.type}
                                    </span>
                                </div>

                                {/* Location */}
                                <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-3">
                                    <LocationOnIcon className="h-4 w-4 mr-1" />
                                    <span>{university.location.city}, {university.location.region}</span>
                                </div>

                                {/* Description */}
                                {university.description && (
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                                        {university.description}
                                    </p>
                                )}

                                {/* Details */}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <div className="flex items-center">
                                        <CalendarTodayIcon className="h-3 w-3 mr-1" />
                                        <span>Est. {university.establishedYear}</span>
                                    </div>
                                    {university.website && (
                                        <div className="flex items-center">
                                            <LanguageIcon className="h-3 w-3 mr-1" />
                                            <a 
                                                href={university.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                                            >
                                                Website
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Action Button */}
                                <Link
                                    to={`/search?university=${university._id}`}
                                    className="w-full bg-indigo-600 dark:bg-indigo-700 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200 text-center block text-sm font-medium"
                                >
                                    Find Hostels
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredUniversities.length === 0 && (
                    <div className="text-center py-16">
                        <SchoolIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No universities found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Try adjusting your search or filter criteria.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setFilter('all');
                                setSelectedRegion('');
                            }}
                            className="bg-indigo-600 dark:bg-indigo-700 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-200"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UniversitiesPage;
