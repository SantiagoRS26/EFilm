import { MovieDetail } from "@/domain/Movie/MovieDetail";
import { formatDate } from "@/shared/utils/FormatDate";

interface MovieCardDetailedProps {
  movie: MovieDetail;
}

export const MovieCardDetailed: React.FC<MovieCardDetailedProps> = ({ movie }) => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg">
      <img 
        src={movie.poster || "/images/default-poster.png"}
        alt={`Poster de ${movie.title}`} 
        className="w-full md:w-1/3 h-auto object-cover"
        loading="lazy"
      />
      <div className="p-6 md:w-2/3 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">{movie.title}</h2>
          <p className="text-gray-300 mb-4">{movie.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genres.map(genre => (
              <span 
                key={genre.genreId} 
                className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap text-gray-400 text-sm">
          <span className="mr-6">Duración: {movie.duration} minutos</span>
          <span className="mr-6">Fecha de lanzamiento: {new Date(movie.releaseDate).toLocaleDateString()}</span>
          {/* Añade más detalles si es necesario */}
        </div>
      </div>
    </div>
  );
};