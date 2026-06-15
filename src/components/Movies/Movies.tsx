import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "@/components/MovieModal/MovieModal";
import EditMovieModal from "@/components/MovieModal/EditMovieModal";
import styles from "./Movies.module.css";
import Fab from "@mui/material/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

  //------

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

  //------


export default function Movies({
  movies,
  onMovieAdded,
  onMovieEdited,
  onMovieDeleted,
}: MoviesProps) {

  // --- State ---
  const [showModal, setShowModal] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [search, setSearch] = useState("");


  // Ref vers l'input recherche, utilisé pour l'autofocus au montage
  const searchRef = useRef<HTMLInputElement>(null);


  // Autofocus sur la barre de recherche dès l'affichage de la page
  useEffect(() => {
    searchRef.current?.focus();
  }, []);


  // useCallback : évite de recréer cette fonction à chaque render
  // (passée en prop à MovieCard, donc utile pour éviter des re-renders inutiles)
  const handleDelete = useCallback(
    async (slug: string, title: string) => {
      const confirmed = window.confirm(`Delete "${title}" ?`);
      if (!confirmed) return;

      const res = await fetch(`/api/movies/${slug}`, { method: "DELETE" });
      if (res.ok) {
        onMovieDeleted();
      }
    },
    [onMovieDeleted],
  );


  // useMemo : recalcule la liste filtrée seulement si "movies" ou "search" changent
  // (évite de refiltrer à chaque render, même quand rien n'a changé)
  const filteredMovies = useMemo(() => {
    if (!search) return movies;
    return movies.filter((m) =>
      m.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [movies, search]);



  return (
    <section className={styles.section}>

      {/* --- Header : titre + recherche + bouton ajout --- */}
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


        {/* FAB en position fixe = reste visible même au scroll */}
        <Fab
          color="primary"
          variant="extended"
          onClick={() => setShowModal(true)}
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }} />
          Create Movie
        </Fab>
      </div>



      {/* --- Grille des films --- */}
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


      {/* --- Modals : affichées conditionnellement selon le state --- */}
      {showModal && (
        <MovieModal
          onClose={() => setShowModal(false)}
          onSuccess={onMovieAdded}
        />
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