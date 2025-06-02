// src/components/forms/FormSelect.tsx

import React from 'react';

export interface FormSelectProps {
    id: string;
    name: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
    required?: boolean;

    // Add className so that Contact.tsx can pass styling down:
    className?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
                                                   id,
                                                   name,
                                                   label,
                                                   value,
                                                   onChange,
                                                   options,
                                                   required = false,
                                                   className = '',
                                               }) => {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 mb-1">
                {label}
            </label>
            <select
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className={`${className} w-full`}
            >
                <option value="" disabled>
                    -- select an option --
                </option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelect;
