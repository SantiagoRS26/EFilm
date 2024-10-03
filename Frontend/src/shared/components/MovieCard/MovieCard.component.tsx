import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

interface MovieCardProps {
    movie: MovieBasicInfo;
    onClick: () => void;
  }
  
  export const MovieCard: React.FC<MovieCardProps> = React.memo(({ movie, onClick }) => {
    const router = useRouter();

    const handleClick = () => {
      router.push(`/movie/${movie.movieId}`);
    }
    
    return (
      <div 
        className="relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:rotate-[0.7deg]"
        onClick={handleClick}
      >
        <img 
          src={movie.posterUrl || '/images/default-poster.png'} 
          alt={`Poster de ${movie.title}`}
          className="w-full h-auto rounded-md object-cover"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 via-black/60 to-transparent p-4 rounded-b-md">
          <h3 className="text-white text-lg font-semibold">{movie.title}</h3>
          <p className="text-gray-300 text-sm">{new Date(movie.releaseDate).toLocaleDateString()}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-white bg-black bg-opacity-50 rounded-full p-2" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    );
  });