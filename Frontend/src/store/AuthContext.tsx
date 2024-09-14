'use client';

import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IAuthRepository } from "@/adapters/repositories/IAuthRepository";
import { AuthRepository } from "@/infrastructure/api/AuthRepository";

interface AuthContextType {
    isAuthenticated: boolean;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const authRepository: IAuthRepository = new AuthRepository();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            const data = await authRepository.login(email, password);
            setAccessToken(data.accessToken);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authRepository.logout();
            setAccessToken(null);
            setIsAuthenticated(false);
            router.replace("/login");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const value = {
        isAuthenticated,
        accessToken,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}