// components/FormTextArea.tsx
'use client';

import React from 'react';

interface FormTextAreaProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
}) => {
  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default FormTextArea;
