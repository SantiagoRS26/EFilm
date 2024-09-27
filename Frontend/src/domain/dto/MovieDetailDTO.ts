import { CommentDTO } from "./CommentDTO";
import { GenreDTO } from "./GenreDTO";
import { KeywordDTO } from "./KeywordDTO";
import { MovieLanguageDTO } from "./MovieLanguageDTO";

export interface MovieDetailDTO {
  movieId: string;
  title: string;
  description: string;
  poster: string | null;
  releaseDate: string;
  duration: number;
  voteAverage: number;
  voteCount: number;
  revenue: number;
  budget: number;
  imdbId: string;
  backdropPath: string | null;
  tagline: string;
  genders: GenreDTO[];
  keywords: KeywordDTO[];
  comments: CommentDTO[];
  movieLanguages: MovieLanguageDTO[];
}
