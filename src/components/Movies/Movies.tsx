import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "@/components/MovieModal/MovieModal";
import EditMovieModal from "@/components/MovieModal/EditMovieModal";
import styles from "./Movies.module.css";

type Movie = {
  slug: string;
  title: string;
  description_short: string;
  description_long: string;
  rating: string | null;
  type: string;
  img: string;
  isTrending: boolean;
  comingSoon: boolean;
};

type MoviesProps = {
  movies: Movie[];
  onMovieAdded: () => void;
  onMovieEdited: () => void;
  onMovieDeleted: () => void;
};

export default function Movies({ movies, onMovieAdded, onMovieEdited, onMovieDeleted }: MoviesProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const handleDelete = useCallback(async (slug: string, title: string) => {
    const confirmed = window.confirm(`Delete "${title}" ?`);
    if (!confirmed) return;

    const res = await fetch(`/api/movies/${slug}`, { method: "DELETE" });
    if (res.ok) {
      onMovieDeleted();
    }
  }, [onMovieDeleted]);

  const filteredMovies = useMemo(() => {
    if (!search) return movies;
    return movies.filter(m =>
      m.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [movies, search]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Movies</h2>
        <input
          ref={searchRef}
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>+ Create Movie</button>
      </div>
      <div className={styles.grid}>
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie.slug}
            slug={movie.slug}
            title={movie.title}
            description_short={movie.description_short}
            rating={movie.rating}
            type={movie.type}
            img={movie.img}
            isTrending={movie.isTrending}
            comingSoon={movie.comingSoon}
            onEdit={() => setEditingMovie(movie)}
            onDelete={() => handleDelete(movie.slug, movie.title)}
          />
        ))}
      </div>
      {showModal && (
        <MovieModal onClose={() => setShowModal(false)} onSuccess={onMovieAdded} />
      )}
      {editingMovie && (
        <EditMovieModal
          movie={editingMovie}
          onClose={() => setEditingMovie(null)}
          onSuccess={onMovieEdited}
        />
      )}
    </section>
  );
}