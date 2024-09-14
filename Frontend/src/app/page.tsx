import { Login } from "@/pages/Login.page";
import { MovieList } from "@/pages/MovieList.page";


export default function Home() {
  return (
    <div className="bg-white">
      <MovieList/>
      <Login/>
    </div>
  );
}
