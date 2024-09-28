import { IGenreRepository } from "@/adapters/repositories/IGenreRepository";
import { GenreDTO } from "@/domain/dto/GenreDTO";
import { PagedResultDTO } from "@/domain/dto/PagedResultDTO";

export class GetPagedGenresUseCase {
    private genreRepository: IGenreRepository;
  
    constructor(genreRepository: IGenreRepository) {
      this.genreRepository = genreRepository;
    }
  
    async execute(pageNumber: number = 1, pageSize: number = 2): Promise<PagedResultDTO<GenreDTO>> {
      try {
        const pagedGenres = await this.genreRepository.getPagedGenres(pageNumber, pageSize);
        return pagedGenres;
      } catch (error) {
        console.error('Error en GetPagedGenresUseCase:', error);
        throw new Error('Error al obtener los géneros paginados');
      }
    }
  }