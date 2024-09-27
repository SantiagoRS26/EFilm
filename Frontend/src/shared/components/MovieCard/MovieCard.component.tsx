import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import React from "react";

interface MovieCardProps {
    movie: MovieBasicInfo;
    onClick: () => void;
  }
  
  export const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie, onClick }) => {
    return (
      <div 
        className="movie-card cursor-pointer" 
        onClick={onClick}
      >
        <img 
          src={movie.posterUrl || '/default-poster.jpg'} 
          alt={`Poster de ${movie.title}`} 
          className="w-full h-auto rounded"
          loading="lazy"
        />
        <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-600">{movie.releaseDate.toLocaleDateString()}</p>
      </div>
    );
  });