import { useState } from "react";
import styles from "./MovieModal.module.css";

type MovieModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

export default function MovieModal({ onClose, onSuccess }: MovieModalProps) {
  const [form, setForm] = useState({
    title: "",
    description_short: "",
    description_long: "",
    img: "",
    rating: "",
    type: "",
    isTrending: false,
    comingSoon: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const target = e.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    setForm({ ...form, [target.name]: value });
  }

  async function handleSubmit() {
    await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    onSuccess();
    onClose();
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Add a Movie</h2>

        <input className={styles.input} name="title" placeholder="Title" onChange={handleChange} />
        <input className={styles.input} name="type" placeholder="Type (ex: Sci-Fi)" onChange={handleChange} />
        <textarea className={styles.textarea} name="description_short" placeholder="Short description" onChange={handleChange} />
        <textarea className={styles.textarea} name="description_long" placeholder="Long description" onChange={handleChange} />
        <input className={styles.input} name="img" placeholder="Image path (ex: /images/monfilm.jpg)" onChange={handleChange} />
        <input className={styles.input} name="rating" placeholder="Rating (ex: 8.5)" onChange={handleChange} />

        <div className={styles.checkboxRow}>
          <label>
            <input type="checkbox" name="isTrending" onChange={handleChange} />
            Trending
          </label>
          <label>
            <input type="checkbox" name="comingSoon" onChange={handleChange} />
            Coming Soon
          </label>
        </div>

        <div className={styles.actions}>
          <button className={styles.btnSecondary} onClick={onClose}>Cancel</button>
          <button className={styles.btnPrimary} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}