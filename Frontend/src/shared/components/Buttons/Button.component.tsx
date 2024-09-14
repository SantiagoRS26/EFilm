import React from "react";

interface ButtonProps {
    onClick: () => void;
    text: string;
    type?: "button" | "submit";
}

export const Button: React.FC<ButtonProps> = ({ onClick, text, type = "button" }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className="w-full bg-black text-white p-2 rounded-full"
        >
            {text}
        </button>
    );
}