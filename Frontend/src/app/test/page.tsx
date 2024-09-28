// src/components/TestGetPagedGenres.tsx
'use client';
import React, { useEffect, useState } from "react";
import { GetPagedGenresUseCase } from "@/useCases/Genre/getPagedGenres.useCase";
import { GenreDTO } from "@/domain/dto/GenreDTO";
import { PagedResultDTO } from "@/domain/dto/PagedResultDTO";
import { GenreRepository } from "@/infrastructure/api/GenreRepository";

const TestGetPagedGenres: React.FC = () => {
  const [genres, setGenres] = useState<GenreDTO[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Función para cargar géneros al montar el componente o cambiar de página
    const loadGenres = async () => {
      setLoading(true);
      setError(null);

      try {
        const genreRepository = new GenreRepository(); // Simulamos el repositorio real
        const getPagedGenresUseCase = new GetPagedGenresUseCase(genreRepository);

        const pagedResult: PagedResultDTO<GenreDTO> = await getPagedGenresUseCase.execute(page, 4);

        setGenres(pagedResult.items);
        setTotalPages(pagedResult.totalPages);
      } catch (err) {
        setError('Error al obtener los géneros.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadGenres();
  }, [page]); // Ejecuta cuando cambia la página

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  return (
    <div>
      <h1>Test Get Paged Genres Use Case</h1>

      {loading && <p>Cargando géneros...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul>
        {genres.map((genre) => (
          <li key={genre.genreId}>{genre.name}</li>
        ))}
      </ul>

      <div className="mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page <= 1}
          className="mr-2 bg-gray-300 p-2 rounded"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          className="bg-gray-300 p-2 rounded"
        >
          Siguiente
        </button>
      </div>

      <p>Página {page} de {totalPages}</p>
    </div>
  );
};

export default TestGetPagedGenres;
