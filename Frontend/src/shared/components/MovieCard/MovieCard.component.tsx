import React from "react";
import { Movie } from "@/domain/Movie/Movie.entity";

type MovieCardProps = {
    movie: Movie;
    onClick: () => void;
    isSelected: boolean;
};

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, isSelected }) => {
    return (
        <div
            onClick={onClick}
            className={`movie-card flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg text-black transform transition duration-300 cursor-pointer ${
                isSelected ? "scale-110 shadow-2xl z-10 -translate-y-4 opacity-100" : "hover:-translate-y-3 hover:scale-105 hover:shadow-2xl opacity-80"
            }`}
        >
            <img
                src={movie.poster}
                alt={movie.title}
                className="h-96 w-full rounded-2xl object-cover"
            />
        </div>
    );
}