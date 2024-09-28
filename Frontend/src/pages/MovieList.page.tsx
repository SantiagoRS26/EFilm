// MovieList.tsx
'use client';

import React, { useCallback, useState } from "react";
import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { MovieCardDetailed } from "@/shared/components/MovieCard/MovieCardDetailed.component";
import { GenreListSection } from "@/shared/components/Genre/GenreListSection";

export const MovieList: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [loadingMovieDetail, setLoadingMovieDetail] = useState(false);
  const [errorMovieDetail, setErrorMovieDetail] = useState<string | null>(null);

  const handleMovieSelect = useCallback(async (movieId: string) => {
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
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="fixed top-0 left-0 right-0 bg-black bg-opacity-75 p-4 z-50">
        <h1 className="text-3xl font-bold">Mi Netflix Clone</h1>
      </header>
      <main className="pt-20 px-4">
        <GenreListSection onMovieSelect={handleMovieSelect} />
      </main>
    </div>
  );
};
