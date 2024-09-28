import { GenreDTO } from "@/domain/dto/GenreDTO";
import { PagedResultDTO } from "@/domain/dto/PagedResultDTO";
import { Genre } from "@/domain/Movie/Genre";

export interface IGenreRepository {
  getAllGenres(): Promise<Genre[]>;
  getPagedGenres(pageNumber?: number, pageSize?: number): Promise<PagedResultDTO<GenreDTO>>;
}