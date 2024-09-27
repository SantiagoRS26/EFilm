import { Genre } from "@/domain/Movie/Genre";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { GetFilteredMoviesUseCase } from "@/useCases/Movie/getFilteredMovies.useCase";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MovieCard } from "./MovieCard/MovieCard.component";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";

interface GenreSectionProps {
  genre: Genre;
  onMovieSelect: (movieId: string) => void;
}

export const GenreSection: React.FC<GenreSectionProps> = ({
  genre,
  onMovieSelect,
}) => {
  const [movies, setMovies] = useState<MovieBasicInfo[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const movieRepository = new MovieRepository();
  const getFilteredMoviesUseCase = new GetFilteredMoviesUseCase(
    movieRepository
  );

  useEffect(() => {
    loadMovies();
  }, [page]);

  const loadMovies = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const filters = { genreId: genre.genreId };
      const pagedMovies = await getFilteredMoviesUseCase.execute(
        filters,
        page,
        10
      );
      setMovies((prev) => [...prev, ...pagedMovies.items]);
      setHasMore(page < pagedMovies.totalPages);
    } catch (error) {
      console.error(
        `Error al cargar películas para el género ${genre.name}:`,
        error
      );
      setError("No se pudieron cargar las películas.");
    } finally {
      setLoading(false);
    }
  };

  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">{genre.name}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-400">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <div
                ref={lastMovieElementRef}
                key={movie.movieId}
                className="flex-shrink-0"
              >
                <MovieCard
                  movie={movie}
                  onClick={() => onMovieSelect(movie.movieId)}
                />
              </div>
            );
          } else {
            return (
              <div key={movie.movieId} className="flex-shrink-0">
                <MovieCard
                  movie={movie}
                  onClick={() => onMovieSelect(movie.movieId)}
                />
              </div>
            );
          }
        })}
        {loading && <p>Cargando más películas...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
};
