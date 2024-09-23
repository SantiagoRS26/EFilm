import router from "next/router";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButton: React.FC = () => {
    const handleGoogleLogin = () => {
        const returnUrl = encodeURIComponent(`${window.location.origin}/auth/callback`);
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/external-login/google?returnUrl=${returnUrl}`;
      };

    return (
        <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white text-gray-500 font-medium"
        >
            <FcGoogle className="w-7 h-7 mr-2" />
            Sign in with Google
        </button>
    );
};

export default GoogleLoginButton;
