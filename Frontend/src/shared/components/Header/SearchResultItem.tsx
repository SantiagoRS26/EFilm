import React from "react";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import { useRouter } from "next/navigation";

interface SearchResultItemProps {
	movie: MovieBasicInfo;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ movie }) => {
	const router = useRouter();

	const handleSelect = () => {
		router.push(`/movie/${movie.movieId}`);
	};

	return (
		<div
			className="flex items-center space-x-4 p-2 hover:bg-gray-700/60 transition-colors duration-300 rounded cursor-pointer"
			onClick={handleSelect}>
			<img
				src={movie.posterUrl || "/images/default-poster.png"}
				alt={movie.title}
				className="w-12 h-16 object-cover rounded"
			/>
			<div>
				<h3 className="text-lg font-semibold">{movie.title}</h3>
				<p className="text-sm text-gray-400">
					{new Date(movie.releaseDate).getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default SearchResultItem;
