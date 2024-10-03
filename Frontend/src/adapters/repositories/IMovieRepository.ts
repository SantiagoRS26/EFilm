import { MovieFilters } from "@/domain/dto/MovieFilters";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { PagedResult } from "@/domain/Movie/PagedResult";

export interface IMovieRepository {
    /* getAllMovies(): Promise<Movie[]>; */
    getFilteredMovies(filters: MovieFilters, pageNumber?: number, pageSize?: number): Promise<PagedResult<MovieBasicInfo>>;
    getMovieById(id: string): Promise<MovieDetail | null>;
    searchMovies(query: string, pageNumber?: number, pageSize?: number): Promise<PagedResult<MovieBasicInfo>>
}