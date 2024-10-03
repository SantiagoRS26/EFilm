"use client";

import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { MovieRepository } from "@/infrastructure/api/MovieRepository";
import { GetMovieByIdUseCase } from "@/useCases/Movie/getMovieById.useCase";
import {
	FaStar,
	FaStarHalfAlt,
	FaRegStar,
	FaRegThumbsUp,
} from "react-icons/fa";
import React, { useEffect, useState } from "react";

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
		<div
			className="relative min-h-screen bg-cover bg-center text-white flex flex-col justify-end"
			style={{
				backgroundImage: `url(${
					movieDetail.backdropPath || "/default-backdrop.jpg"
				})`,
				fontFamily: `'Poppins', sans-serif`,
			}}>
			{/* Overlay semitransparente */}
			<div className="absolute inset-0 bg-black opacity-40"></div>

			{/* Información de la película en la parte inferior */}
			<div className="relative z-10 container mx-auto p-4 md:p-8 mb-8">
				<div className="flex flex-col sm:flex-row justify-between">
					{/* Título y géneros */}
					<div className="text-white max-w-full sm:max-w-4xl flex flex-col justify-center">
						<div className="flex space-x-2 sm:space-x-4 text-sm sm:text-lg mb-2 uppercase tracking-wide">
							{movieDetail.genres &&
								movieDetail.genres.length > 0 &&
								movieDetail.genres.map((genre, index) => (
									<span key={index}>{genre.name}</span>
								))}
						</div>
						<h1 className="text-4xl sm:text-7xl font-bold mb-2">
							{movieDetail.title}
						</h1>
						{movieDetail.tagline && (
							<p className="text-xl sm:text-3xl italic text-gray-300 mb-2">
								{`"${movieDetail.tagline}"`}
							</p>
						)}
						<p className="text-sm sm:text-lg text-gray-300 mb-4">
							{movieDetail.duration} mins
						</p>

						{/* Votaciones con estrellas */}
						<div className="flex items-center space-x-2">
							<div className="flex items-center">
								{[...Array(5)].map((_, index) => {
									const fullStars = Math.floor(movieDetail.voteAverage / 2);
									const hasHalfStar =
										movieDetail.voteAverage / 2 - fullStars >= 0.5;

									return (
										<span key={index}>
											{index < fullStars ? (
												<FaStar className="text-yellow-400" />
											) : index === fullStars && hasHalfStar ? (
												<FaStarHalfAlt className="text-yellow-400" />
											) : (
												<FaRegStar className="text-gray-400" />
											)}
										</span>
									);
								})}
							</div>
							<p className="flex items-center text-sm sm:text-lg">
								<span className="font-bold">
									{movieDetail.voteAverage.toFixed(1)}
								</span>
								/10
							</p>
							{/* Contador de votos con ícono */}
							<div className="flex items-center space-x-1 text-sm sm:text-lg">
								<FaRegThumbsUp className="text-yellow-400" />
								<p>({movieDetail.voteCount.toLocaleString()} votos)</p>
							</div>
						</div>
					</div>

					{/* Sinopsis a la derecha, se ajusta en pantallas pequeñas */}
					<div className="text-white text-left max-w-full sm:max-w-md mt-4 sm:mt-0">
						<h2 className="text-xl sm:text-2xl font-semibold mb-2 tracking-wide uppercase">
							STORYLINE
						</h2>
						<p className="text-sm sm:text-lg text-gray-300 leading-relaxed">
							{movieDetail.description}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
});
