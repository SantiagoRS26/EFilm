import React from "react";

interface ButtonProps {
    onClick?: () => void;
    text: string;
    type?: "button" | "submit";
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    onClick,
    text,
    type = "button",
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className="w-full bg-blue-600 text-white py-3 rounded-2xl focus:ring-blue-800"
        >
            {text}
        </button>
    );
};
