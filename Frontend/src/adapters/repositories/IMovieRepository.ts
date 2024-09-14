import { Movie } from "@/domain/Movie/Movie";

export interface IMovieRepository {
    getAllMovies(): Promise<Movie[]>;
    getMovieById(id: string): Promise<Movie | null>;
}