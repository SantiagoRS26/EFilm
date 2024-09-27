import { Keyword } from "./Keyword";
import { MovieLanguage } from "./MovieLanguage";
import { MovieDetailDTO } from "../dto/MovieDetailDTO";
import { Comment } from "./Comment";
import { Genre } from "./Genre";

export class MovieDetail {
    public movieId: string;
    public title: string;
    public description: string;
    public poster: string | null;
    public releaseDate: Date;
    public duration: number;
    public voteAverage: number;
    public voteCount: number;
    public revenue: number;
    public budget: number;
    public imdbId: string;
    public backdropPath: string | null;
    public tagline: string;
    public genders: Genre[];
    public keywords: Keyword[];
    public comments: Comment[];
    public movieLanguages: MovieLanguage[];
  
    constructor(movieData: MovieDetailDTO) {
      this.movieId = movieData.movieId;
      this.title = movieData.title;
      this.description = movieData.description;
      this.poster = movieData.poster;
      this.releaseDate = new Date(movieData.releaseDate);
      this.duration = movieData.duration;
      this.voteAverage = movieData.voteAverage;
      this.voteCount = movieData.voteCount;
      this.revenue = movieData.revenue;
      this.budget = movieData.budget;
      this.imdbId = movieData.imdbId;
      this.backdropPath = movieData.backdropPath;
      this.tagline = movieData.tagline;
      this.genders = movieData.genders.map(g => new Genre(g));
      this.keywords = movieData.keywords.map(k => new Keyword(k));
      this.comments = movieData.comments.map(c => new Comment(c));
      this.movieLanguages = movieData.movieLanguages.map(ml => new MovieLanguage(ml));
    }
  }