'use client';
import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="bg-sky-100 w-14 h-14 rounded-full flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-sky-900 mb-3">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      icon: (
        <svg className="w-7 h-7 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: 'Affordable Rates',
      description: 'Transparent pricing with no hidden costs',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: 'Fast Order Matching',
      description: 'Match orders and deliver your goods immediately',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      title: 'Wide-Ranging Vehicles',
      description: 'Motorcycle, sedan, MPV, pick-up & truck delivery services',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: '48 Serviceable Areas',
      description: 'Island-wide coverage across Luzon and in Cebu',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'Safe Delivery',
      description: 'Professional partner drivers to deliver packages safely',
    },
    {
      icon: (
        <svg className="w-7 h-7 text-sky-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: 'Real-time Tracking',
      description: 'Track orders real-time from pick-up to drop-off',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-900 mb-4">
            Fast. Simple. Affordable.
          </h2>
          <div className="w-20 h-1 bg-sky-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
            Our delivery solutions are designed to meet all your logistics needs with efficiency and
            reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="bg-sky-800 hover:bg-sky-700 text-white px-8 py-3 rounded-full font-medium text-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Get Started Today
          </button>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust LaLaba for all their delivery needs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
