// src/components/forms/FormInput.tsx

import React from 'react';

export interface FormInputProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;

    // Allow CSS classes to be passed in
    className?: string;

    // Optional forwarded ref (e.g. for autocomplete)
    inputRef?: React.Ref<HTMLInputElement>;
}

const FormInput: React.FC<FormInputProps> = ({
                                                 id,
                                                 name,
                                                 label,
                                                 value,
                                                 onChange,
                                                 placeholder = '',
                                                 type = 'text',
                                                 required = false,
                                                 className = '',
                                                 inputRef,
                                             }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 mb-1">
                {label}
            </label>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                ref={inputRef}
                className={`${className} w-full`}
            />
        </div>
    );
};

export default FormInput;
