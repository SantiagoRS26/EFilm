import { IMovieRepository } from "@/adapters/repositories/IMovieRepository";
import { MovieFilters } from "@/domain/dto/MovieFilters";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import { PagedResult } from "@/domain/Movie/PagedResult";

export class GetFilteredMoviesUseCase {
    private movieRepository: IMovieRepository;

    constructor(movieRepository: IMovieRepository) {
        this.movieRepository = movieRepository;
    }

    async execute(filters: MovieFilters, pageNumber: number = 1, pageSize: number = 10): Promise<PagedResult<MovieBasicInfo>>{
        try {
            const pagedMovies = await this.movieRepository.getFilteredMovies(filters, pageNumber, pageSize);
            return pagedMovies;
        } catch (error) {
            throw new Error("Error al traer las peliculas filtradas");
        }
    }
}