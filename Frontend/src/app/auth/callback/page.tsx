"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/store/AuthContext";
import { Button } from "@/shared/components/Buttons/Button.component";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CallbackPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/MovieList");
    } else {
      setTimeout(() => {
        router.replace("/");
      }, 3000);
    }
  }, [isAuthenticated, router]);

  return (
    <div className="bg-gradient-to-b from-[#FFDEE9] to-[#B5FFFC] h-screen flex flex-col items-center justify-center">
      <div className="flex bg-white rounded-lg text-black flex-col items-center p-20 gap-y-5 shadow-lg">
        <h1 className="text-3xl font-semibold">Autenticando...</h1>
        <p className="text-gray-500">Por favor, espera mientras procesamos tu autenticación.</p>
        <div className="animate-spin text-gray-500">
          <AiOutlineLoading3Quarters className="w-12 h-12" />
        </div>
        <p className="text-gray-400 text-sm mt-4">
          Serás redirigido automáticamente en breve.
        </p>
        <Button
          text="Redirigir manualmente"
          onClick={() => router.replace(isAuthenticated ? "/MovieList" : "/")}
        />
        <div className="flex items-center justify-center mt-5 w-full text-center">
          <hr className="w-full border-t border-gray-300" />
          <span className="mx-2 text-gray-400 w-full">O</span>
          <hr className="w-full border-t border-gray-300" />
        </div>
        <button
          onClick={() => router.replace("/login")}
          className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white text-gray-500 font-medium"
        >
          <FcGoogle className="w-7 h-7 mr-2" />
          Volver al Login
        </button>
      </div>
    </div>
  );
};

export default CallbackPage;
