import { MovieLanguageDTO } from "../dto/MovieLanguageDTO";

export class MovieLanguage {
    public movieLanguageId: string;
    public language: string;
  
    constructor(data: MovieLanguageDTO) {
      this.movieLanguageId = data.movieLanguageId;
      this.language = data.language;
    }
  }