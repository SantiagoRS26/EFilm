import React, { useState } from "react";

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validate?: (value: string) => string | undefined;
}

export const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, validate }) => {
    const [error, setError] = useState<string | undefined>(undefined);

    const handleBlur = () => {
        if (validate) {
            const validationError = validate(value);
            setError(validationError);
        }
    }

    return (
        <div className="mb-4">
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    onChange(e);
                    if(error){
                        setError(validate ? validate(e.target.value) : undefined);
                    }
                }}
                onBlur={handleBlur}
                className={`w-full p-2 border border-gray-300 rounded-full px-6 pb-3     ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}