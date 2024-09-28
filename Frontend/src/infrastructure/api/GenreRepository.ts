import { IGenreRepository } from "@/adapters/repositories/IGenreRepository";
import { Genre } from "@/domain/Movie/Genre";
import { httpClient } from "../http/HttpClient";
import { GenreDTO } from "@/domain/dto/GenreDTO";
import { PagedResultDTO } from "@/domain/dto/PagedResultDTO";

export class GenreRepository implements IGenreRepository {
    async getAllGenres(): Promise<Genre[]> {
      try {
        const genresData = await httpClient.get<GenreDTO[]>('/genre');
        return genresData.map(genreData => new Genre(genreData));
      } catch (error) {
        console.error('Error al obtener los géneros:', error);
        throw error;
      }
    }

    async getPagedGenres(pageNumber: number = 1, pageSize: number = 10): Promise<PagedResultDTO<GenreDTO>> {
      try {
        const queryParams = new URLSearchParams();
        queryParams.append('pageNumber', pageNumber.toString());
        queryParams.append('pageSize', pageSize.toString());
  
        const response = await httpClient.get<PagedResultDTO<GenreDTO>>(`/genre/paged?${queryParams.toString()}`);
        
        return response;
      } catch (error) {
        console.error('Error al obtener los géneros paginados:', error);
        throw error;
      }
    }
  }