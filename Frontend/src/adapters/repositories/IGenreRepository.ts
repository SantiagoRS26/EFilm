import { Genre } from "@/domain/Movie/Genre";

export interface IGenreRepository {
  getAllGenres(): Promise<Genre[]>;
}