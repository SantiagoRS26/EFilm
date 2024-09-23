"use client";

import React, { useState } from "react";
import { Input } from "@/shared/components/Buttons/Input.component";
import { FaUser } from "react-icons/fa";
import { RiUserSmileFill } from "react-icons/ri";
import { MdAlternateEmail, MdLock } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/shared/components/Buttons/Button.component";
import { useAuth } from "@/store/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const { register } = useAuth();
    const router = useRouter();

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isChecked) return;

        try {
            await register(name, email, password);
            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="w-full flex flex-col-reverse md:flex-row">
            <div className="relative w-full md:w-1/2 h-screen flex justify-center pt-3 bg-gradient-to-b from-[#FFDEE9] to-[#B5FFFC]">
                <Image
                    src="/images/undraw_horror_movie_3988.svg"
                    alt="Background Image"
                    layout="fill"

                    objectPosition="top"
                    className="absolute inset-0 p-10"
                />
            </div>
            <div className="flex w-full md:w-1/2 items-center justify-center flex-col h-screen bg-white">
                <div className="flex flex-col md:w-6/12 h-3/6 justify-center gap-y-5">
                    <h1 className="font-bold text-2xl text-blue-950">
                        Create Your Account
                    </h1>
                    <button className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-full shadow-sm hover:shadow-lg transition-shadow duration-200 bg-white text-gray-500 font-medium">
                        <FcGoogle className="w-7 h-7 mr-2" />
                        Sign Up with Google
                    </button>
                    <div className="flex items-center justify-center my-4 w-full">
                        <hr className="w-full border-t border-gray-300" />
                        <span className="mx-2 text-gray-400">OR</span>
                        <hr className="w-full border-t border-gray-300" />
                    </div>
                    <form action="" className=" space-y-8 text-gray-300">
                        <Input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            withIcon={true}
                            icon={<RiUserSmileFill className="w-5 h-5" />}
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            withIcon={true}
                            icon={<MdAlternateEmail className="w-5 h-5" />}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            withIcon={true}
                            icon={<MdLock className="w-5 h-5" />}
                        />
                        <div className="flex items-center space-x-2 my-4">
                            <input
                                type="checkbox"
                                id="terms"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className="w-5 h-5 text-blue-600 bg-black border-gray-500 rounded focus:ring-blue-500 cursor-pointer"
                            />
                            <label htmlFor="terms" className="text-gray-500">
                                I agree to the{" "}
                                <a
                                    href="/terms"
                                    className="text-blue-600 hover:underline"
                                >
                                    Terms & Conditions
                                </a>
                            </label>
                        </div>
                        <Button text="Register" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}
