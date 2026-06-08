import Image from "next/image";
import styles from "./MovieDetail.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

type MovieDetailProps = {
  title: string;
  type: string;
  rating: string | null;
  description_long: string;
  img: string;
  isTrending: boolean;
  comingSoon: boolean;
};

export default function MovieDetail({ title, type, rating, description_long, img, isTrending, comingSoon }: MovieDetailProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.posterWrapper}>
        <Image
          src={img}
          alt={title}
          width={180}
          height={260}
          className={styles.poster}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.meta}>
          <span className={styles.metaText}>{type}</span>
          {isTrending && <span className={styles.metaText}>🔥 Trending</span>}
        </div>
        {!comingSoon && rating && (
          <div className={styles.rating}>
            <FontAwesomeIcon icon={faStar} width={18} color="#EF9F27" />
            <span className={styles.ratingNum}>{rating}</span>
            <span className={styles.ratingLabel}>/ 10</span>
          </div>
        )}
        {comingSoon && <span className={styles.metaText}>🎬 Coming Soon</span>}
        <p className={styles.description}>{description_long}</p>
      </div>
    </div>
  );
}