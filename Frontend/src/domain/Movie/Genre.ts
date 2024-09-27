import { GenreDTO } from "../dto/GenreDTO";

export class Genre {
    public genreId: string;
    public name: string;
  
    constructor(data: GenreDTO) {
      this.genreId = data.genreId;
      this.name = data.name;
    }
}