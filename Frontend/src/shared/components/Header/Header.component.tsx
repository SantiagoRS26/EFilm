import React, { useState } from "react";

interface HeaderProps {
    isLoggedIn: boolean;
    userProfileImage?: string;
    onLoginClick: () => void;
    onRegisterClick: () => void;
    onLogoutClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
    isLoggedIn,
    userProfileImage,
    onLoginClick,
    onRegisterClick,
    onLogoutClick,
}) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark");
    }

    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">Movie Library</h1>
            <div className="flex items-center gap-4">
                {isLoggedIn ? (
                    <>
                        <img
                            src={userProfileImage}
                            alt="User profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <button
                            onClick={onLogoutClick}
                            className="px-4 py-2 text-white bg-red-500 rounded-md"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={onLoginClick}
                            className="px-4 py-2 text-white bg-blue-500 rounded-md"
                        >
                            Login
                        </button>
                        <button
                            onClick={onRegisterClick}
                            className="px-4 py-2 text-white bg-blue-500 rounded-md"
                        >
                            Register
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}