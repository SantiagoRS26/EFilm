import { IMovieRepository } from "@/adapters/repositories/IMovieRepository";
import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { httpClient } from "../http/HttpClient";
import { MovieDetailDTO } from "@/domain/dto/MovieDetailDTO";
import { MovieFilters } from "@/domain/dto/MovieFilters";
import { PagedResult } from "@/domain/Movie/PagedResult";
import { MovieBasicInfo } from "@/domain/Movie/MovieBasicInfo";
import { PagedResultDTO } from "@/domain/dto/PagedResultDTO";
import { MovieBasicInfoDTO } from "@/domain/dto/MovieBasicInfoDTO";

export class MovieRepository implements IMovieRepository {
/*   async getAllMovies(accessToken?: string): Promise<Movie[]> {
    try {
      const moviesData = await httpClient.get<MovieDTO[]>('/Movie?query=fast%20and%20furious', accessToken);
      return moviesData.map((movieData) => new Movie(movieData));
    } catch (error) {
      console.error('Error al obtener las películas:', error);
      throw error;
    }
  } */

  async getMovieById(id: string): Promise<MovieDetail | null> {
    try {
      const movieData = await httpClient.get<MovieDetailDTO>(`/Movie/${id}`);
      return movieData ? new MovieDetail(movieData) : null;
    } catch (error) {
      console.error(`Error al obtener la película con ID ${id}:`, error);
      throw error;
    }
  }

  async getFilteredMovies(filters: MovieFilters, pageNumber: number = 1, pageSize: number = 10): Promise<PagedResult<MovieBasicInfo>> {
    try {
      const queryParams = new URLSearchParams();

      if (filters.genreId) queryParams.append('genreId', filters.genreId);
      if (filters.keyword) queryParams.append('keyword', filters.keyword);
      if (filters.releaseDate) queryParams.append('releaseDate', filters.releaseDate.toISOString());
      queryParams.append('pageNumber', pageNumber.toString());
      queryParams.append('pageSize', pageSize.toString());

      const response = await httpClient.get<PagedResultDTO<MovieBasicInfoDTO>>(`/Movie/filtered?${queryParams.toString()}`);

      const pagedResult = new PagedResult<MovieBasicInfo>(
        {
          ...response,
          items: response.items.map(movieData => new MovieBasicInfo(movieData)),
        }
      );

      return pagedResult;
    } catch (error) {
      console.error('Error al obtener las películas filtradas:', error);
      throw error;
    }
  }

}
