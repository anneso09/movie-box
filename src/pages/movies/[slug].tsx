import { useRouter } from "next/router";
import myData from "@/data/myData.json";
import Hero from "@/components/Hero/Hero";
import MovieDetail from "@/components/MovieDetail/MovieDetail";

export default function MovieDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const movie = myData.movies.find((m) => m.slug === slug);

  if (!movie) return <p>Film non trouvé.</p>;

  return (
    <>
      <Hero
        title={movie.title}
        description={movie.description_short}
        img={movie.img}
        isPromoted={true}
      />
      <MovieDetail
        title={movie.title}
        type={movie.type}
        rating={movie.rating}
        description_long={movie.description_long}
        img={movie.img}
        isTrending={movie.isTrending}
        comingSoon={movie.comingSoon}
      />
    </>
  );
}