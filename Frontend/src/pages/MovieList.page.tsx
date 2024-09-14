'use client';

import React, { useEffect, useState } from "react";
import { GetMoviesUseCase } from "@/useCases/Movie/getMovies.useCase";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { Movie } from "@/domain/Movie/Movie";
import { MovieCard } from "@/shared/components/MovieCard/MovieCard.component";
import { MovieCardDetailed } from "@/shared/components/MovieCard/MovieCardDetailed.component";
import { formatDate } from "@/shared/utils/FormatDate";

export const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    
    useEffect(() => {
        const movieRepository = new MovieRepository();
        const getMoviesUseCase = new GetMoviesUseCase(movieRepository);

        getMoviesUseCase.execute().then((movies) => {
            setMovies(movies);
            setLoading(false);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }, []);

    const handleCardClick = (movie: Movie) => {
        setSelectedMovie(movie);
    }

    if (loading) {
        return <p>Cargando peliculas</p>;
    }
    return (
        <div>
            <main>
                <h1>Películas</h1>
                {selectedMovie && (
                    <div className="p-4 mb-4 bg-white shadow-lg rounded-xl text-black">
                        <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
                        <p>{selectedMovie.description}</p>
                        <p>Fecha de salida: {formatDate(selectedMovie.releaseDate)}</p>
                    </div>
                )}
                <div className="movie-list flex gap-16 overflow-x-auto p-14">
                    {movies.map((movie, index) => (
                        <MovieCard 
                            key={index} 
                            movie={movie} 
                            onClick={() => handleCardClick(movie)} 
                            isSelected={selectedMovie?.MovieId === movie.MovieId} 
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}