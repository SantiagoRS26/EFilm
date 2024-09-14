import { IMovieRepository } from "@/adapters/repositories/IMovieRepository";
import { MovieDTO } from "@/domain/dto/MovieDTO";
import { Movie } from "@/domain/Movie/Movie";
import { httpClient } from "@/infrastructure/http/HttpClient";
6
export class MovieRepository implements IMovieRepository {
    async getAllMovies(): Promise<Movie[]> {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const moviesData = await httpClient.get<MovieDTO[]>(`${apiUrl}/Movie?query=fast%20and%20furious`);
            
            return moviesData.map((movieData) => new Movie(movieData));
        } catch (error) {
            console.error("Error fetching movies:", error);
            throw new Error("Error fetching movies");
        }
    }

    async getMovieById(id: string): Promise<Movie | null> {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;

            const movieData = await httpClient.get<MovieDTO>(`${apiUrl}/Movie/${id}`);
            
            return movieData ? new Movie(movieData) : null;
        } catch (error) {
            console.error(`Error fetching movie with ID ${id}:`, error);
            throw new Error("Error fetching movie");
        }
    }
}
