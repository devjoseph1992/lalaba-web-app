'use client';
import React from 'react';

const PricingCard = ({ title, price, features, popular }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden border-2 ${popular ? 'border-blue-600 relative' : 'border-gray-100'}`}
    >
      {popular && (
        <div className="bg-blue-600 text-white text-center py-1 text-sm font-bold">
          MOST POPULAR
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="mb-6">
          <span className="text-4xl font-bold text-gray-800">${price}</span>
          <span className="text-gray-600">/visit</span>
        </div>
        <ul className="mb-8 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <button
          className={`w-full py-3 rounded-lg font-medium transition duration-300 ${
            popular
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
          }`}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const pricingPlans = [
    {
      title: 'Basic Cleaning',
      price: '120',
      features: [
        'Dusting all surfaces',
        'Vacuuming and mopping floors',
        'Bathroom cleaning',
        'Kitchen cleaning',
        'Up to 2 hours',
      ],
      popular: false,
    },
    {
      title: 'Standard Cleaning',
      price: '180',
      features: [
        'All Basic Cleaning services',
        'Window cleaning (interior)',
        'Appliance exterior cleaning',
        'Organization assistance',
        'Up to 3 hours',
      ],
      popular: true,
    },
    {
      title: 'Premium Cleaning',
      price: '250',
      features: [
        'All Standard Cleaning services',
        'Deep cleaning of kitchen',
        'Deep cleaning of bathrooms',
        'Inside cabinet cleaning',
        'Up to 4 hours',
      ],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Transparent Pricing</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Choose the cleaning plan that fits your needs. All plans include our satisfaction
            guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
