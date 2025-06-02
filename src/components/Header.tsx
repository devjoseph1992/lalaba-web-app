'use client';
import React, { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to scroll to registraion section
  const scrollToRegistration = () => {
    setIsMenuOpen(false);
    const registrationSection = document.getElementById('registration');
    if (registrationSection) {
      registrationSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-sky-300 w-10 h-10 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">LB</span>
          </div>
          <span className="ml-3 text-xl font-bold text-sky-900">LaLaba</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#services" className="text-gray-600 hover:text-blue-600 font-medium">
            Services
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium">
            How It Works
          </a>
          <a href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium">
            Testimonials
          </a>
        </nav>

        <div className="hidden md:block">
          <button
            onClick={scrollToRegistration}
            className="bg-sky-900 hover:bg-sky-800 text-white px-6 py-2 rounded-full font-medium transition duration-300"
          >
            Register Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <a
              href="#services"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <button
              onClick={scrollToRegistration}
              className="bg-sky-900 hover:bg-sky-800 text-white px-6 py-2 rounded-full font-medium mt-2 transition duration-300"
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
