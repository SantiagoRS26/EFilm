import { IGenreRepository } from "@/adapters/repositories/IGenreRepository";
import { Genre } from "@/domain/Movie/Genre";

export class GetGenresUseCase {
    private genreRepository: IGenreRepository;
  
    constructor(genreRepository: IGenreRepository) {
      this.genreRepository = genreRepository;
    }
  
    async execute(): Promise<Genre[]> {
      try {
        const genres = await this.genreRepository.getAllGenres();
        return genres;
      } catch (error) {
        console.error('Error en GetGenresUseCase:', error);
        throw new Error('Error al obtener los géneros');
      }
    }
  }