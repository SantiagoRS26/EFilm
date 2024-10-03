import React from "react";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import SearchResultItem from "./SearchResultItem";

interface SearchResultsDropdownProps {
	results: MovieBasicInfo[];
}

const SearchResultsDropdown: React.FC<SearchResultsDropdownProps> = ({
	results,
}) => {
	return (
		<div className="absolute backdrop-blur-md bg-gray-800/30 text-white p-4 rounded-md max-h-96 overflow-y-auto shadow-lg z-10">
			{results.map((movie) => (
				<SearchResultItem
					key={movie.movieId}
					movie={movie}
				/>
			))}
		</div>
	);
};

export default SearchResultsDropdown;
