// MovieList.tsx
'use client';

import React, { useCallback, useState } from "react";
import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { MovieCardDetailed } from "@/shared/components/MovieCard/MovieCardDetailed.component";
import { GenreListSection } from "@/shared/components/Genre/GenreListSection";
import Header from "@/shared/components/Header/Header.component";

export const MovieList: React.FC = () => {
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [loadingMovieDetail, setLoadingMovieDetail] = useState(false);
  const [errorMovieDetail, setErrorMovieDetail] = useState<string | null>(null);

  const movieRepository = new MovieRepository();

  const handleMovieSelect = useCallback(async (movieId: string) => {
    setLoadingMovieDetail(true);
    setErrorMovieDetail(null);
    try {
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
      <Header movieRepository={movieRepository}></Header>
      <main className="pt-32 pl-10 pr-10">
        <GenreListSection onMovieSelect={handleMovieSelect} />
      </main>
    </div>
  );
};
