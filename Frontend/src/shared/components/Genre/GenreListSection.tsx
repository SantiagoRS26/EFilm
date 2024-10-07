import React, { useEffect, useState } from "react";
import { GenreSection } from "./GenreSection";
import { Genre } from "@/domain/Movie/Genre";
import { GenreRepository } from "@/infrastructure/api/GenreRepository";
import { GetPagedGenresUseCase } from "@/useCases/Genre/getPagedGenres.useCase";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAnimate, useInView } from "framer-motion";

interface GenreListSectionProps {
	onMovieSelect: (movieId: string) => void;
}

export const GenreListSection: React.FC<GenreListSectionProps> = ({
	onMovieSelect,
}) => {
	const [genres, setGenres] = useState<Genre[]>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const genreRepository = new GenreRepository();
	const getPagedGenresUseCase = new GetPagedGenresUseCase(genreRepository);

	const loadGenres = async () => {
		try {
			const pagedGenres = await getPagedGenresUseCase.execute(page, 3);

			const newGenres = pagedGenres.items.map((data) => new Genre(data));

			setGenres((prev) => {
				const existingGenreIds = prev.map((genre) => genre.genreId);
				const filteredNewGenres = newGenres.filter(
					(newGenre) => !existingGenreIds.includes(newGenre.genreId)
				);

				return [...prev, ...filteredNewGenres];
			});

			setHasMore(page < pagedGenres.totalPages);
			setPage((prevPage) => prevPage + 1);
		} catch (error) {
			console.error("Error al cargar los géneros:", error);
			setError("No se pudieron cargar los géneros.");
		}
	};

	useEffect(() => {
		loadGenres();
	}, []);

	return (
		<section className="genre-list-section">
			<h2 className="text-3xl font-bold mb-6 text-white">Géneros</h2>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<InfiniteScroll
				dataLength={genres.length}
				next={loadGenres}
				hasMore={hasMore}
				loader={<p className="text-white">Cargando más géneros...</p>}>
				<div className="genre-list flex flex-col space-y-8">
					{genres.map((genre) => (
						<GenreSection
							key={genre.genreId}
							genre={genre}
							onMovieSelect={onMovieSelect}
						/>
					))}
				</div>
			</InfiniteScroll>
		</section>
	);
};
