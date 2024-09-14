import { IMovieRepository } from "@/adapters/repositories/IMovieRepository";

export class GetMoviesUseCase{
    private movieRepository: IMovieRepository;

    constructor(movieRepository: IMovieRepository){
        this.movieRepository = movieRepository;
    }

    async execute(){
        try{
            const movies = await this.movieRepository.getAllMovies();
            return movies;
        }catch(error){
            throw new Error("Error al traer las peliculas");
        }
    }
}