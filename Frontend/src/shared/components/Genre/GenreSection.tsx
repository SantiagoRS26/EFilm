import React, { useEffect, useState, useMemo } from "react";
import { MovieCard } from "../MovieCard/MovieCard.component";
import { Genre } from "@/domain/Movie/Genre";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { GetFilteredMoviesUseCase } from "@/useCases/Movie/getFilteredMovies.useCase";
import InfiniteScroll from "react-infinite-scroll-component";

interface GenreSectionProps {
  genre: Genre;
  onMovieSelect: (movieId: string) => void;
}

export const GenreSection: React.FC<GenreSectionProps> = React.memo(
  
  ({ genre, onMovieSelect }) => {
    const [movies, setMovies] = useState<MovieBasicInfo[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const movieRepository = new MovieRepository();
    const getFilteredMoviesUseCase = new GetFilteredMoviesUseCase(
      movieRepository
    );

    const loadMovies = async () => {
      try {
        const filters = { genreId: genre.genreId };
        const pagedMovies = await getFilteredMoviesUseCase.execute(
          filters,
          page,
          8
        );
        setMovies((prev) => {
          const movieIds = prev.map((movie) => movie.movieId);
          const newMovies = pagedMovies.items.filter(
            (movie) => !movieIds.includes(movie.movieId)
          );
          return [...prev, ...newMovies];
        });
        setHasMore(page < pagedMovies.totalPages);
        setPage((prevPage) => prevPage + 1);
      } catch (error) {
        console.error("Error al cargar los géneros:", error);
        setError("No se pudieron cargar los géneros.");
      }
    };

    useEffect(() => {
      loadMovies();
    }, []);

    return (
      <section className="genre-section">
        <h3 className="text-2xl font-semibold mb-4 text-white">{genre.name}</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <InfiniteScroll
          dataLength={movies.length}
          next={loadMovies}
          hasMore={hasMore}
          loader={<p className="text-white">Cargando más películas...</p>}
          scrollableTarget={`scrollable-${genre.genreId}`}
        >
          <div
            id={`scrollable-${genre.genreId}`}
            className="movie-list flex gap-x-12 overflow-x-auto py-6"
          >
            {movies.map((movie) => (
              <div key={movie.movieId} className="flex-shrink-0 w-72">
                <MovieCard
                  movie={movie}
                  onClick={() => onMovieSelect(movie.movieId)}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </section>
    );
  }
);
