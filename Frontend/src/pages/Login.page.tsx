'use client';

import React, { useState } from "react";
import { Input } from "@/shared/components/Buttons/Input.component";
import { Button } from "@/shared/components/Buttons/Button.component";
import { SocialSignInButton } from "@/shared/components/Buttons/ButtonLogin.component";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => { 
        console.log("Iniciando sesión con email: ", email, " y password: ", password); 
    };

    return (
        <main className="w-full h-screen flex gap-y-10 bg-white flex-col justify-center items-center text-black px-20">
            <div className="">
                <h1 className="text-black font-bold">Login to Your Account</h1>
                <p className="text-gray-600">Access your personalized movie collection</p>
            </div>
            <div className="flex w-full justify-center items-center text-center">
                <div className="w-1/3">
                    <Input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        text="Login to Your Account"
                        onClick={handleLogin}
                        type="submit"
                    />
                </div>
                <div className="w-1/3">/</div>
                <div className="w-1/3">
                    <SocialSignInButton
                        text="Sign in with Google"
                        onClick={() => console.log("Iniciando sesión con Google")}
                        provider="google"
                    />
                    <SocialSignInButton
                        text="Sign in with Facebook"
                        onClick={() => console.log("Iniciando sesión con Facebook")}
                        provider="facebook"
                    />
                </div>
            </div>
            <p>Forgot Password?</p>
        </main>
    )
}