import { useState, useCallback } from "react";
import Hero from "@/components/Hero/Hero";
import Movies from "@/components/Movies/Movies";
import myDataJson from "@/data/myData.json";

export default function Home() {
  const [movies, setMovies] = useState(myDataJson.movies);

  const refreshMovies = useCallback(async () => {
    const res = await fetch("/api/movies-list");
    const data = await res.json();
    setMovies(data.movies);
  }, []);

  return (
    <>
      <Hero
        title={myDataJson.title}
        description={myDataJson.description_short}
        img={myDataJson.img}
        isPromoted={myDataJson.isPromoted}
      />
      <Movies
        movies={movies}
        onMovieAdded={refreshMovies}
        onMovieEdited={refreshMovies}
        onMovieDeleted={refreshMovies}
      />
    </>
  );
}