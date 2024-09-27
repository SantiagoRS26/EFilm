import { MovieBasicInfoDTO } from "../dto/MovieBasicInfoDTO";

export class MovieBasicInfo {
  public movieId: string;
  public title: string;
  public posterUrl: string | null;
  public releaseDate: Date;

  constructor(data: MovieBasicInfoDTO) {
    this.movieId = data.movieId;
    this.title = data.title;
    this.posterUrl = data.posterUrl;
    this.releaseDate = new Date(data.releaseDate);
  }
}