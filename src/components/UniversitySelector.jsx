import React, { useState, useEffect } from 'react';
import { universityService } from '../services/api';
import { School as SchoolIcon, LocationOn as LocationOnIcon, ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

const UniversitySelector = ({ selectedUniversity, onUniversityChange, className = "" }) => {
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUni, setSelectedUni] = useState(null);

    useEffect(() => {
        fetchUniversities();
    }, []);

    useEffect(() => {
        if (selectedUniversity && universities.length > 0) {
            const uni = universities.find(u => u._id === selectedUniversity);
            setSelectedUni(uni);
        }
    }, [selectedUniversity, universities]);

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

    const filteredUniversities = universities.filter(uni =>
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.location.city.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (university) => {
        setSelectedUni(university);
        onUniversityChange(university._id);
        setIsOpen(false);
        setSearchQuery('');
    };

    const handleClear = () => {
        setSelectedUni(null);
        onUniversityChange('');
        setIsOpen(false);
    };

    if (loading) {
        return (
            <div className={`animate-pulse ${className}`}>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-4 py-3 text-left bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-200"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <SchoolIcon className="text-gray-400 dark:text-gray-500" />
                            <div>
                                {selectedUni ? (
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {selectedUni.shortName}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedUni.name}
                                        </div>
                                        <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center mt-1">
                                            <LocationOnIcon className="h-3 w-3 mr-1" />
                                            {selectedUni.location.city}, {selectedUni.location.region}
                                        </div>
                                    </div>
                                ) : (
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Select a university
                                    </span>
                                )}
                            </div>
                        </div>
                        <ExpandMoreIcon 
                            className={`text-gray-400 transition-transform duration-200 ${
                                isOpen ? 'transform rotate-180' : ''
                            }`} 
                        />
                    </div>
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg max-h-80 overflow-hidden">
                    {/* Search Input */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                        <input
                            type="text"
                            placeholder="Search universities..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            autoFocus
                        />
                    </div>

                    {/* Clear Option */}
                    {selectedUni && (
                        <div className="border-b border-gray-200 dark:border-gray-700">
                            <button
                                onClick={handleClear}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <div className="text-gray-500 dark:text-gray-400 text-sm">
                                    Clear selection
                                </div>
                            </button>
                        </div>
                    )}

                    {/* Universities List */}
                    <div className="max-h-64 overflow-y-auto">
                        {filteredUniversities.length > 0 ? (
                            filteredUniversities.map((university) => (
                                <button
                                    key={university._id}
                                    onClick={() => handleSelect(university)}
                                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                                        selectedUni?._id === university._id
                                            ? 'bg-indigo-50 dark:bg-indigo-900'
                                            : ''
                                    }`}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                                                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm">
                                                    {university.shortName}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {university.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                                <LocationOnIcon className="h-4 w-4 mr-1" />
                                                {university.location.city}, {university.location.region}
                                            </div>
                                            <div className="text-xs text-gray-400 dark:text-gray-500">
                                                {university.type} • Est. {university.establishedYear}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-gray-500 dark:text-gray-400 text-sm">
                                No universities found
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Overlay to close dropdown */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default UniversitySelector;
