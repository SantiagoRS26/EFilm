'use client';

import React, { useEffect, useState } from "react";
import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { MovieCardDetailed } from "@/shared/components/MovieCard/MovieCardDetailed.component";
import { Genre } from "@/domain/Movie/Genre";

import { GenreRepository } from "@/infrastructure/api/GenreRepository";
import { GetGenresUseCase } from "@/useCases/Genre/getGenres.useCase";
import { GenreSection } from "@/shared/components/GenreSection";

export const MovieList: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [loadingMovieDetail, setLoadingMovieDetail] = useState(false);
  const [errorGenres, setErrorGenres] = useState<string | null>(null);
  const [errorMovieDetail, setErrorMovieDetail] = useState<string | null>(null);

  useEffect(() => {
    const genreRepository = new GenreRepository();
    const getGenresUseCase = new GetGenresUseCase(genreRepository);

    getGenresUseCase.execute().then((genres) => {
      setGenres(genres);
      setLoadingGenres(false);
    }).catch((error) => {
      console.error(error);
      setErrorGenres('No se pudieron cargar los géneros.');
      setLoadingGenres(false);
    });
  }, []);

  const handleMovieSelect = async (movieId: string) => {
    setLoadingMovieDetail(true);
    setErrorMovieDetail(null);
    try {
      const movieRepository = new MovieRepository();
      const movieDetail = await movieRepository.getMovieById(movieId);
      setSelectedMovie(movieDetail);
    } catch (error) {
      console.error(error);
      setErrorMovieDetail('No se pudieron cargar los detalles de la película.');
    } finally {
      setLoadingMovieDetail(false);
    }
  };

  if (loadingGenres) {
    return <p>Cargando géneros y películas...</p>;
  }

  if (errorGenres) {
    return <p className="text-red-500">{errorGenres}</p>;
  }

  return (
    <div>
      <main>
        <h1>Películas</h1>
        {selectedMovie && (
          <div className="p-4 mb-4 bg-white shadow-lg rounded-xl text-black">
            {loadingMovieDetail ? (
              <p>Cargando detalles de la película...</p>
            ) : errorMovieDetail ? (
              <p className="text-red-500">{errorMovieDetail}</p>
            ) : (
              <MovieCardDetailed movie={selectedMovie} />
            )}
          </div>
        )}
        <div>
          {genres.map((genre) => (
            <GenreSection 
              key={genre.genreId}
              genre={genre} 
              onMovieSelect={handleMovieSelect} 
            />
          ))}
        </div>
      </main>
    </div>
  );
};