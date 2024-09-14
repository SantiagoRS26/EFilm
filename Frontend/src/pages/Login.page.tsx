'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/components/Buttons/Input.component";
import { Button } from "@/shared/components/Buttons/Button.component";
import { SocialSignInButton } from "@/shared/components/Buttons/ButtonLogin.component";
import { useAuth } from "@/store/AuthContext";
import { HttpError } from "@/shared/utils/HttpError";

export const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await login(email, password);
            router.push("/MovieList");
        } catch (error: any) {
            console.error("Error al iniciar sesión:", error);
            if (error instanceof HttpError) {
                if (error.status === 401) {
                    alert("Credenciales inválidas. Por favor, verifica tu correo y contraseña.");
                } else {
                    alert(`Error al iniciar sesión: ${error.message}`);
                }
            } else {
                alert("Error al iniciar sesión. Por favor, intenta de nuevo más tarde.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="w-full h-screen flex gap-y-10 bg-white flex-col justify-center items-center text-black px-20">
            <div className="">
                <h1 className="text-black font-bold">Login to Your Account</h1>
                <p className="text-gray-600">Access your personalized movie collection</p>
            </div>
            <div className="flex w-full justify-center items-center text-center">
                <form className="w-1/3" onSubmit={handleLogin}>
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
                        text={isLoading ? "Logging in..." : "Login to Your Account"}
                        type="submit"
                        disabled={isLoading}
                    />
                </form>
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