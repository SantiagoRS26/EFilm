import React, { useState, useEffect, useMemo, useRef } from "react";
import { MdSearch } from "react-icons/md";
import { Input } from "@/shared/components/Buttons/Input.component";
import { SearchMoviesUseCase } from "@/useCases/Movie/searchMovies.useCase";
import { IMovieRepository } from "@/adapters/repositories/IMovieRepository";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import { PagedResult } from "@/domain/Movie/PagedResult";
import debounce from "lodash.debounce";
import SearchResultsDropdown from "./SearchResultsDropdown";

interface HeaderProps {
	movieRepository: IMovieRepository;
}

const Header: React.FC<HeaderProps> = ({ movieRepository }) => {
	const [query, setQuery] = useState("");
	const [isSearching, setIsSearching] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [searchResults, setSearchResults] =
		useState<PagedResult<MovieBasicInfo> | null>(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	const searchRef = useRef<HTMLDivElement>(null);

	const searchMoviesUseCase = useMemo(
		() => new SearchMoviesUseCase(movieRepository),
		[movieRepository]
	);

	const debouncedSearch = useMemo(
		() =>
			debounce(async (searchTerm: string) => {
				if (searchTerm.trim() === "") {
					setSearchResults(null);
					setIsDropdownOpen(false);
					setIsSearching(false);
					setError(null);
					return;
				}
				setIsSearching(true);
				setError(null);
				try {
					const results = await searchMoviesUseCase.execute(searchTerm);
					setSearchResults(results);
					setIsDropdownOpen(true);
				} catch (err) {
					setError((err as Error).message);
					setSearchResults(null);
					setIsDropdownOpen(false);
				} finally {
					setIsSearching(false);
				}
			}, 300),
		[searchMoviesUseCase]
	);

	useEffect(() => {
		debouncedSearch(query);
		return () => {
			debouncedSearch.cancel();
		};
	}, [query, debouncedSearch]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="fixed top-0 left-0 right-0 z-50">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-md"></div>{" "}
			{/* Fondo desenfocado */}
			<header className="relative p-4 flex items-center justify-between">
				<h1 className="text-3xl font-bold">IMDb "Clone"</h1>
				<div
					className="relative w-3/12 text-white focus-within:text-white"
					ref={searchRef}>
					<Input
						type="text"
						placeholder="Buscar películas..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						withIcon={true}
						icon={<MdSearch className="w-5 h-5 text-gray-400" />}
						required={false}
					/>
					{isSearching && (
						<span className="absolute right-2 top-2 text-gray-400">
							<svg
								className="animate-spin h-5 w-5 text-gray-400"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8v8H4z"></path>
							</svg>
						</span>
					)}
					{error && <p className="text-red-500 mt-2">{error}</p>}
					{isDropdownOpen &&
						searchResults &&
						searchResults.items.length > 0 && (
							<SearchResultsDropdown results={searchResults.items} />
						)}
					{isDropdownOpen &&
						searchResults &&
						searchResults.items.length === 0 && (
							<div className="absolute left-0 right-0 bg-gray-800 text-white p-4 rounded-md mt-2">
								No se encontraron resultados.
							</div>
						)}
				</div>
			</header>
		</div>
	);
};

export default Header;
