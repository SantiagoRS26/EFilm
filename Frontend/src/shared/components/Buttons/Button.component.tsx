import React from "react";

interface ButtonProps {
    onClick?: () => void;
    text: string;
    type?: "button" | "submit";
    disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ onClick, text, type = "button", disabled }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className="w-full bg-black text-white p-2 rounded-full"
        >
            {text}
        </button>
    );
}