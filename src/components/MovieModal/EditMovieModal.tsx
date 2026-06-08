import { useState } from "react";
import styles from "./MovieModal.module.css";

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

type EditMovieModalProps = {
  movie: Movie;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditMovieModal({ movie, onClose, onSuccess }: EditMovieModalProps) {
  const [form, setForm] = useState({
    title: movie.title,
    description_short: movie.description_short,
    description_long: movie.description_long,
    img: movie.img,
    rating: movie.rating ?? "",
    type: movie.type,
    isTrending: movie.isTrending,
    comingSoon: movie.comingSoon,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  }

  async function handleSubmit() {
    await fetch(`/api/movies/${movie.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onSuccess();
    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Edit Movie</h2>

        <input className={styles.input} name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input className={styles.input} name="type" value={form.type} onChange={handleChange} placeholder="Type" />
        <textarea className={styles.textarea} name="description_short" value={form.description_short} onChange={handleChange} placeholder="Short description" />
        <textarea className={styles.textarea} name="description_long" value={form.description_long} onChange={handleChange} placeholder="Long description" />
        <input className={styles.input} name="img" value={form.img} onChange={handleChange} placeholder="Image path" />
        <input className={styles.input} name="rating" value={form.rating ?? ""} onChange={handleChange} placeholder="Rating" />

        <div className={styles.checkboxRow}>
          <label>
            <input type="checkbox" name="isTrending" checked={form.isTrending} onChange={handleChange} />
            Trending
          </label>
          <label>
            <input type="checkbox" name="comingSoon" checked={form.comingSoon} onChange={handleChange} />
            Coming Soon
          </label>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={onClose}>Cancel</button>
          <button className={styles.btnPrimary} onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
}