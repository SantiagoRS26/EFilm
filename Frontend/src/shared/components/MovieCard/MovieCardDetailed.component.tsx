import React from "react";
import { Movie } from "@/domain/Movie/Movie.entity";

type MovieCardDetailedProps = {
    movie: Movie;
};

export const MovieCardDetailed: React.FC<MovieCardDetailedProps> = ({ movie }) => {
    return (
        <div className="flex bg-white rounded-lg shadow-md flex-shrink-0">
        <img src={movie.poster} alt={movie.title} className="w-1/3 object-cover" />
        <div className="p-4 w-2/3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">{movie.title}</h2>
            <div className="bg-yellow-400 text-white rounded-full px-2 py-1 text-xs font-bold">
              {movie.title}
            </div>
          </div>
          <p className="text-gray-600 text-sm">{movie.title}</p>
          <p className="text-gray-600 text-sm">{movie.title}</p>
          <p className="text-gray-500 text-sm mt-2">{movie.description}</p>
          <div className="text-gray-800 font-bold mt-4">{movie.MovieId}</div>
        </div>
      </div>
    );
};