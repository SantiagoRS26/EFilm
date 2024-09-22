import React, { useState, ReactNode } from "react";
import { FaUser } from "react-icons/fa";

interface InputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    validate?: (value: string) => string | undefined;
    withIcon?: boolean;
    icon?: ReactNode;
    required?: boolean;
}

export const Input: React.FC<InputProps> = ({
    type,
    placeholder,
    value,
    onChange,
    validate,
    withIcon = false,
    icon = <FaUser />,
    required,
}) => {
    const [error, setError] = useState<string | undefined>(undefined);

    const handleBlur = () => {
        if (validate) {
            const validationError = validate(value);
            setError(validationError);
        }
    };

    return (
        <div className="mb-4 w-full">
            <div
                className="flex items-center border border-gray-300 rounded-2xl px-3 py-1 
            focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 
            transition duration-200 hover:shadow-lg focus-within:shadow-lg 
            focus-within:text-gray-600"
            >
                {withIcon && <span className="text-gray-400 mr-1">{icon}</span>}{" "}
                <input
                    required={required}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        if (error) {
                            setError(
                                validate ? validate(e.target.value) : undefined
                            );
                        }
                    }}
                    onBlur={handleBlur}
                    className={`w-full p-2 outline-none bg-transparent ${
                        error ? "border-red-500" : ""
                    }`}
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};
