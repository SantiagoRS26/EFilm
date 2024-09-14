import React from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

interface SocialSignInButtonProps {
    onClick: () => void;
    text: string;
    type?: "button" | "submit";
    provider: "google" | "facebook" | "apple";
}

export const SocialSignInButton: React.FC<SocialSignInButtonProps> = ({ onClick, text, type = "button", provider }) => {
    const icons = {
        google: <FaGoogle className="text-2xl"/>,
        facebook: <FaFacebook className="text-2xl"/>,
        apple: <FaApple className="text-2xl"/>,
    };

    return (
        <button
            onClick={onClick}
            type={type}
            className="flex gap-x-2 items-center justify-start w-full p-2 my-2 text-black border rounded-full hover:bg-gray-200 transition-colors"
        >
            <span>{icons[provider]}</span>
            {text}
        </button>
    );
}
