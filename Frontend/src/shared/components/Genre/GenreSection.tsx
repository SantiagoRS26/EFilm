import React, { useEffect, useState, useRef } from "react";
import { MovieCard } from "../MovieCard/MovieCard.component";
import { Genre } from "@/domain/Movie/Genre";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { GetFilteredMoviesUseCase } from "@/useCases/Movie/getFilteredMovies.useCase";

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
		const [atStart, setAtStart] = useState<boolean>(true);
		const [atEnd, setAtEnd] = useState<boolean>(false);

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

		const scrollRef = useRef<HTMLDivElement | null>(null);

		const handleScroll = () => {
			if (scrollRef.current) {
				const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
				setAtStart(scrollLeft === 0);
				setAtEnd(scrollLeft + clientWidth >= scrollWidth);
			}
		};

		const scrollLeft = () => {
			if (scrollRef.current) {
				scrollRef.current.scrollBy({
					left: -1500,
					behavior: "smooth",
				});
				handleScroll();
			}
		};

		const scrollRight = () => {
			if (scrollRef.current) {
				scrollRef.current.scrollBy({
					left: 1500,
					behavior: "smooth",
				});
				handleScroll();
			}
			if (hasMore) {
				loadMovies();
			}
		};

		return (
			<section className="genre-section relative group">
				<h3 className="text-2xl font-semibold mb-4 text-white">{genre.name}</h3>
				{error && <p className="text-red-500 mb-4">{error}</p>}

				<div className="relative">
					{/* Flecha izquierda, solo mostrar si no estamos al inicio */}
					{!atStart && (
						<button
							className="group absolute left-0 top-0 h-full w-16 z-10
                         bg-gradient-to-r from-gray-900 to-transparent
						 opacity-0 group-hover:opacity-100
                         flex items-center justify-center
						 hover:transition-all hover:duration-300
                         transition duration-300"
							onClick={scrollLeft}>
							<span className="text-white text-3xl transform transition-all duration-300 group-hover:scale-125 px-10 group-hover:animate-pulse">
								{"<"}
							</span>
						</button>
					)}
					<div
						ref={scrollRef}
						onScroll={handleScroll}
						className="movie-list flex gap-x-12 
                       overflow-x-hidden py-6">
						{movies.map((movie) => (
							<div
								key={movie.movieId}
								className="flex-shrink-0 w-72">
								<MovieCard
									movie={movie}
									onClick={() => onMovieSelect(movie.movieId)}
								/>
							</div>
						))}
					</div>
					{/* Flecha derecha, solo mostrar si no estamos al final */}
					{!atEnd && (
						<button
							className="group absolute right-0 top-0 h-full w-16 z-10 
                         bg-gradient-to-l from-gray-900 to-transparent
						 opacity-0 group-hover:opacity-100
                         flex items-center justify-center
                         transition duration-300"
							onClick={scrollRight}>
							<span className="text-white text-3xl transform transition-transform duration-300 group-hover:scale-125 px-10 group-hover:animate-pulse">
								{">"}
							</span>
						</button>
					)}
				</div>
			</section>
		);
	}
);
