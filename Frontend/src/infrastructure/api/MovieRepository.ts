import { IMovieRepository } from '@/adapters/repositories/IMovieRepository';
import { MovieDTO } from '@/domain/dto/MovieDTO';
import { Movie } from '@/domain/Movie/Movie';
import { httpClient } from '@/infrastructure/http/HttpClient';

export class MovieRepository implements IMovieRepository {
  async getAllMovies(accessToken?: string): Promise<Movie[]> {
    try {
      const moviesData = await httpClient.get<MovieDTO[]>('/Movie?query=fast%20and%20furious', accessToken);
      return moviesData.map((movieData) => new Movie(movieData));
    } catch (error) {
      console.error('Error al obtener las películas:', error);
      throw error;
    }
  }

  async getMovieById(id: string, accessToken?: string): Promise<Movie | null> {
    try {
      const movieData = await httpClient.get<MovieDTO>(`/Movie/${id}`, accessToken);
      return movieData ? new Movie(movieData) : null;
    } catch (error) {
      console.error(`Error al obtener la película con ID ${id}:`, error);
      throw error;
    }
  }
}
