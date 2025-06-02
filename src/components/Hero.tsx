'use client';
import React from 'react';
import Image from 'next/image';

const Hero = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pt-20 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Lalaba - Laundry at Your Fingertips
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              Your On-Demand Laundry Delivery Network – Connecting customers to trusted neighborhood
              laundries and reliable riders, ensuring your clothes are cleaned and returned fresh,
              conveniently and affordably.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                onClick={scrollToContact}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium text-lg transition duration-300 shadow-lg hover:shadow-xl"
              >
                Register Now
              </button>
              <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-medium text-lg transition duration-300">
                Learn More
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="bg-blue-500 rounded-full w-80 h-80 absolute -top-6 -left-6 opacity-10"></div>
              <div className="bg-blue-500 rounded-full w-80 h-80 absolute -bottom-6 -right-6 opacity-10"></div>
              <div className="relative w-96 h-96 flex items-center justify-center">
                <Image
                  src="/lalaba_logo.png"
                  alt="Lalaba - Laundry Made Easy"
                  width={384}
                  height={384}
                  className="object-contain"
                  priority // Optional: if this is above-the-fold content
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
