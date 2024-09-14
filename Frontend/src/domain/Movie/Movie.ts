import { MovieDTO } from "../dto/MovieDTO";

export class Movie{
    public MovieId: string;
    public title: string;
    public description: string;
    public releaseDate: Date;
    public poster: string;

    constructor(movieData: MovieDTO) {
        this.MovieId = movieData.movieId;
        this.title = movieData.title;
        this.description = movieData.description;
        this.releaseDate = new Date(movieData.releaseDate);
        this.poster = movieData.poster;
    }
}