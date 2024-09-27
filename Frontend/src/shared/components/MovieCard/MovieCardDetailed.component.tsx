import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { formatDate } from "@/shared/utils/FormatDate";

interface MovieCardDetailedProps {
  movie: MovieDetail;
}

export const MovieCardDetailed: React.FC<MovieCardDetailedProps> = ({ movie }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">{movie.title}</h2>
      <img src={movie.poster || '/default-poster.jpg'} alt={`Poster de ${movie.title}`} />
      <p>{movie.description}</p>
      <p>Duración: {movie.duration} minutos</p>
      <p>Fecha de lanzamiento: {formatDate(movie.releaseDate)}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};