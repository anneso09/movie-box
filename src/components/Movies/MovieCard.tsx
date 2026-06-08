import Image from "next/image";
import Link from "next/link";
import styles from "./MovieCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";

type MovieCardProps = {
  slug: string;
  title: string;
  description_short: string;
  rating: string | null;
  type: string;
  img: string;
  isTrending: boolean;
  comingSoon: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function MovieCard({
  slug,
  title,
  description_short,
  rating,
  type,
  img,
  isTrending,
  comingSoon,
  onEdit,
  onDelete,
}: MovieCardProps) {
  return (
    <Link href={`/movies/${slug}`} className={styles.link}>
      <div className={styles.card}>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        >
          <FontAwesomeIcon icon={faTrash} width={12} />
        </button>
        <Image
          src={img}
          alt={title}
          width={200}
          height={250}
          className={styles.image}
        />
        <div className={styles.info}>
          <span className={styles.type}>{type}</span>
          {isTrending && <span className={styles.trending}>🔥 Trending</span>}
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description_short}</p>
          {comingSoon ? (
            <button className={styles.button}>Pre-order Ticket</button>
          ) : (
            <p className={styles.rating}>
              <FontAwesomeIcon icon={faStar} width={14} /> {rating}
            </p>
          )}
        </div>
        <button
          className={styles.editBtn}
          onClick={(e) => {
            e.preventDefault();
            onEdit();
          }}
        >
          Edit
        </button>
      </div>
    </Link>
  );
}
