import { IMovieRepository } from "@/adapters/repositories/IMovieRepository";
import { MovieDetail } from "@/domain/Movie/MovieDetail";

export class GetMovieByIdUseCase {
    private movieRepository: IMovieRepository;

    constructor(movieRepository: IMovieRepository) {
        this.movieRepository = movieRepository;
    }

    async execute(movieId: string): Promise<MovieDetail | null> {
        if (!movieId) {
            throw new Error("Id de pelicula no puede ser nulo");
        }
        try {
            const movie = await this.movieRepository.getMovieById(movieId);
            if (!movie) {
                throw new Error("No se encontró la pelicula");
            }
            return movie;
        } catch (error) {
            throw new Error("Error al traer la pelicula por id");
        }
    }
}