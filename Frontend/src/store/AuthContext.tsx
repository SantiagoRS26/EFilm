'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { IAuthRepository } from "@/adapters/repositories/IAuthRepository";
import { AuthRepository } from "@/infrastructure/api/AuthRepository";
import { httpClient } from '@/infrastructure/http/HttpClient';
import { publicRoutes } from "@/shared/utils/publicRoutes";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
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
    const router = useRouter();
    const pathname = usePathname();

    const isPublic = publicRoutes.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`)
    );

    // Establecer el callback de logout en HttpClient
    useEffect(() => {
        const handleLogout = async () => {
            if (!isPublic) { // Solo ejecutar logout si la ruta no es pública
                await logout();
            }
        };
        httpClient.setLogoutCallback(handleLogout);
    }, [isPublic]);

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const authenticated = await authRepository.checkAuth();
                setIsAuthenticated(authenticated);
            } catch {
                setIsAuthenticated(false);
                if (!isPublic) { // Solo redirigir si la ruta no es pública
                    await authRepository.logout(); // Ejecutar el logout solo en el repositorio, sin redirigir
                    if (!isPublic) {
                        router.replace("/"); // Redirigir solo si no es una ruta pública
                    }
                }
            }
        };
        checkAuthentication();
    }, [isPublic]);

    const login = async (email: string, password: string) => {
        try {
            await authRepository.login(email, password);
            setIsAuthenticated(true);
            router.push('/MovieList');
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authRepository.logout();
            setIsAuthenticated(false);
            router.replace("/");
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            await authRepository.register(name, email, password);
            setIsAuthenticated(true);
            router.push('/');
        } catch (error) {
            console.error("Error al registrar:", error);
            throw error;
        }
    };

    const value = {
        isAuthenticated,
        login,
        logout,
        register
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};