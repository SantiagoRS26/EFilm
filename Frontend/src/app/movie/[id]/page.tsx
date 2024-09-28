import { MoviePage } from "@/shared/components/MovieCard/MoviePage.component";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="bg-white text-black">
      <MoviePage movieId={params.id}></MoviePage>
    </div>
  );
}