import React from 'react';
import { Home as HomeIcon, Email as EmailIcon, Phone as PhoneIcon, LocationOn as LocationOnIcon } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white mt-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <HomeIcon className="text-indigo-400" />
              <span className="text-lg font-bold">UCC HostelFinder</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed">
              Find the perfect accommodation for your university life at University of Cape Coast. 
              Browse verified hostels with real-time vacancy information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 dark:text-gray-400 hover:text-indigo-400 transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-300 dark:text-gray-400 hover:text-indigo-400 transition duration-200">
                  Browse Hostels
                </a>
              </li>
              <li>
                <a href="/search?featured=true" className="text-gray-300 dark:text-gray-400 hover:text-indigo-400 transition duration-200">
                  Featured Hostels
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 dark:text-gray-400 hover:text-indigo-400 transition duration-200">
                  List Your Hostel
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <EmailIcon className="text-indigo-400 text-lg" />
                <span className="text-gray-300 dark:text-gray-400">info@ucchostelfinder.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <PhoneIcon className="text-indigo-400 text-lg" />
                <span className="text-gray-300 dark:text-gray-400">+233 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <LocationOnIcon className="text-indigo-400 text-lg" />
                <span className="text-gray-300 dark:text-gray-400">University of Cape Coast, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400 dark:text-gray-500">
            <p>&copy; 2025 UCC HostelFinder. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-indigo-400 transition duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-indigo-400 transition duration-200">Terms of Service</a>
              <a href="#" className="hover:text-indigo-400 transition duration-200">Help</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
