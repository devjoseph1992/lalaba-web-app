// components/SubmitButton.tsx
'use client';

import React from 'react';

interface SubmitButtonProps {
  loading: boolean;
  buttonText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ loading, buttonText = 'Register Now' }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`w-full bg-gradient-to-r text-center from-sky-700 to-sky-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center ${
          loading
              ? 'opacity-70 cursor-not-allowed'
              : 'hover:from-sky-800 hover:to-sky-600 transform hover:-translate-y-1'
      }`}

    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Registering...
        </>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default SubmitButton;
