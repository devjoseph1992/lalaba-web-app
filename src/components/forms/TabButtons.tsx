// components/TabButtons.tsx
'use client';

import React from 'react';

interface TabButtonsProps {
  activeTab: 'rider' | 'merchant' | 'washer';
  handleTabChange: (tab: 'rider' | 'merchant' | 'washer') => void;
}

const TabButtons: React.FC<TabButtonsProps> = ({ activeTab, handleTabChange }) => {
  return (
    <div className="flex border-b border-gray-200 mb-6">
      {(['rider', 'merchant', 'washer'] as const).map((tab) => (
        <button
          key={tab}
          className={`py-3 px-6 font-medium text-sm md:text-base ${
            activeTab === tab
              ? 'text-sky-800 border-b-2 border-sky-800'
              : 'text-gray-500 hover:text-sky-700'
          }`}
          onClick={() => handleTabChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
