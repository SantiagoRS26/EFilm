"use client";

import React, { useState } from "react";
import { Login } from "@/pages/Login.page";
import { Input } from "@/shared/components/Buttons/Input.component";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { Button } from "@/shared/components/Buttons/Button.component";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "@/shared/components/Buttons/GoogleLoginButton";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(email, password);
            router.push("/movies");
        } catch (error) {
            alert("Credenciales inválidas o error en el servidor.");
        }
    };

    const handleGoogleLogin = () => {
        const returnUrl = encodeURIComponent(window.location.href);
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/external-login/Google?returnUrl=${returnUrl}`;
    };

    return (
        <div className="bg-gradient-to-b from-[#FFDEE9] to-[#B5FFFC] h-screen flex flex-col items-center justify-center">
            <div className="flex bg-white rounded-lg text-black flex-col items-center p-20 gap-y-5">
                <h1 className="text-3xl">Login</h1>
                <p>Hey, enter your details to get sign in yo your account</p>
                <form onSubmit={handleLogin} className="w-full">
                    <Input
                        type="email"
                        placeholder="Enter Email / User"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        withIcon={true}
                        icon={<MdAlternateEmail className="w-5 h-5" />}
                        required={true}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        withIcon={true}
                        icon={<MdLock className="w-5 h-5" />}
                        required={true}
                    />
                    <Button text="Sign in" type="submit" />
                </form>
                <div className="flex items-center justify-center my-4 w-full text-center">
                    <hr className="w-full border-t border-gray-300" />
                    <span className="mx-2 text-gray-400 w-full">
                        Or Sign in with
                    </span>
                    <hr className="w-full border-t border-gray-300" />
                </div>
                <GoogleLoginButton/>
            </div>
        </div>
    );
}
