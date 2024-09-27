import { IGenreRepository } from "@/adapters/repositories/IGenreRepository";
import { Genre } from "@/domain/Movie/Genre";
import { httpClient } from "../http/HttpClient";
import { GenreDTO } from "@/domain/dto/GenreDTO";

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
  }