import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="material-icons text-primary-400">home</span>
              <span className="text-lg font-bold">UCC HostelFinder</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Find the perfect accommodation for your university life at University of Cape Coast. 
              Browse verified hostels with real-time vacancy information.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-300 hover:text-primary-400 transition duration-200">
                  Home
                </a>
              </li>
              <li>
                <a href="/search" className="text-gray-300 hover:text-primary-400 transition duration-200">
                  Browse Hostels
                </a>
              </li>
              <li>
                <a href="/search?featured=true" className="text-gray-300 hover:text-primary-400 transition duration-200">
                  Featured Hostels
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-primary-400 transition duration-200">
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
                <span className="material-icons text-primary-400 text-lg">email</span>
                <span className="text-gray-300">info@ucchostelfinder.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-primary-400 text-lg">phone</span>
                <span className="text-gray-300">+233 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="material-icons text-primary-400 text-lg">location_on</span>
                <span className="text-gray-300">University of Cape Coast, Ghana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 UCC HostelFinder. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary-400 transition duration-200">Privacy Policy</a>
              <a href="#" className="hover:text-primary-400 transition duration-200">Terms of Service</a>
              <a href="#" className="hover:text-primary-400 transition duration-200">Help</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
