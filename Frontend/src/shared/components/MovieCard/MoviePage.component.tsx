"use client";

import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { GetMovieByIdUseCase } from "@/useCases/Movie/getMovieById.useCase";
import React from "react";
import { useEffect, useState } from "react";

interface MoviePageProps {
  movieId: string;
}

export const MoviePage: React.FC<MoviePageProps> = React.memo(({ movieId }) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (movieId) {
      const fetchMovieDetail = async () => {
        try {
          const movieRepository = new MovieRepository();
          const getMovieByIdUseCase = new GetMovieByIdUseCase(movieRepository);
          const movie = await getMovieByIdUseCase.execute(movieId);
          setMovieDetail(movie);
        } catch (error) {
          setError("Error al traer la película");
        } finally {
          setLoading(false);
        }
      };
      fetchMovieDetail();
    }
  }, [movieId]);

  if (loading) {
    return <p>Cargando...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  if (!movieDetail) {
    return <p>No se encontró la película</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={movieDetail.poster || "/default-poster.jpg"}
          alt={`Poster de ${movieDetail.title}`}
          className="w-64 h-auto rounded-lg shadow-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{movieDetail.title}</h1>
          <p className="text-lg text-gray-700 mb-4">
            Fecha de estreno:{" "}
            {new Date(movieDetail.releaseDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600 mb-6">{movieDetail.description}</p>
          <div className="flex flex-wrap">
            <div className="mr-6 mb-4">
              <h3 className="font-semibold text-lg">Género:</h3>
              <p className="text-gray-600">
                {movieDetail.genres && movieDetail.genres.length > 0
                  ? movieDetail.genres.map((genre) => genre.name).join(", ")
                  : "Género no disponible"}
              </p>
            </div>
            <div className="mr-6 mb-4">
              <h3 className="font-semibold text-lg">Duración:</h3>
              <p className="text-gray-600">{movieDetail.duration} minutos</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Sinopsis</h2>
        <p className="text-gray-700">{movieDetail.description}</p>
      </div>
    </div>
  );
});
