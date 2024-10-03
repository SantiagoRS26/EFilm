import { IMovieRepository } from "@/adapters/repositories/IMovieRepository";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import { PagedResult } from "@/domain/Movie/PagedResult";

export class SearchMoviesUseCase {
    private movieRepository: IMovieRepository;

    constructor(movieRepository: IMovieRepository) {
        this.movieRepository = movieRepository;
    }

    async execute(query: string): Promise<PagedResult<MovieBasicInfo>> {
        if (!query) {
            throw new Error("Query de búsqueda no puede ser nulo");
        }
        try {
            const movies = await this.movieRepository.searchMovies(query);
            return movies;
        } catch (error) {
            throw new Error("Error al buscar peliculas");
        }
    }
}