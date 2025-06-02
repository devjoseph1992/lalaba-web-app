// components/LeftSidePanel.tsx
'use client';

import React from 'react';

interface LeftSidePanelProps {
  activeTab: 'rider' | 'merchant' | 'washer';
}

const LeftSidePanel: React.FC<LeftSidePanelProps> = ({ activeTab }) => {
  const riderBenefits = [
    'Earn competitive delivery fees',
    'Flexible working hours',
    'Be your own boss',
    'Weekly payout directly to your wallet',
  ];

  const merchantBenefits = [
    'Increase your customer reach',
    'Manage orders through our dashboard',
    'Get paid directly to your wallet',
    '24/7 customer support',
  ];

  const washerBenefits = [
    'Set your own schedule and rates',
    'Work with premium cleaning products',
    'Get paid directly after each job',
    'Build your client base',
  ];

  const benefits =
    activeTab === 'rider'
      ? riderBenefits
      : activeTab === 'merchant'
        ? merchantBenefits
        : washerBenefits;

  const title =
    activeTab === 'rider'
      ? 'Become a Rider'
      : activeTab === 'merchant'
        ? 'Join as Merchant'
        : 'Work as Washer';

  return (
    <div className="md:w-1/2 bg-gradient-to-br from-sky-800 to-sky-600 text-white p-10">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>

      <ul className="space-y-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start">
            <svg
              className="w-5 h-5 text-green-300 mr-2 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 pt-6 border-t border-sky-500/30">
        <div className="flex items-center mb-4">
          <svg
            className="w-8 h-8 text-sky-200 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.210-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            ></path>
          </svg>
          <div>
            <p className="text-sky-100 text-sm">Need help?</p>
            <p className="font-medium">+63 912 345 6789</p>
          </div>
        </div>

        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-sky-200 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          <div>
            <p className="text-sky-100 text-sm">Email us</p>
            <p className="font-medium">support@washly.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidePanel;
