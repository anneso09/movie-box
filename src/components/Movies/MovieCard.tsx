import Image from "next/image";
import Link from "next/link";
import styles from "./MovieCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

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
      <Card className={styles.card}>
        <IconButton
          size="small"
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "#fff",
            zIndex: 10,
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
          }}
        >
          <FontAwesomeIcon icon={faTrash} width={12} />
        </IconButton>

        <CardMedia
          component="div"
          sx={{ position: "relative", width: "100%", height: "60vh" }}
        >
          <Image src={img} alt={title} fill style={{ objectFit: "cover" }} />
        </CardMedia>

        <CardContent sx={{ flex: 1 }}>
          <span className={styles.type}>{type}</span>
          {isTrending && <span className={styles.trending}>🔥 Trending</span>}
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description_short}</p>
          {comingSoon ? (
            <Button
              variant="contained"
              size="small"
              sx={{
                top:5,
                backgroundColor: "#2E4756",
              }}
            >
              Pre-order Ticket
            </Button>
          ) : (
            <p className={styles.rating}>
              <FontAwesomeIcon icon={faStar} width={14} /> {rating}
            </p>
          )}
        </CardContent>

        <Button
          variant="contained"
          size="small"
          sx={{
            width: "25%",
            bottom: 8,
            left: 8,
            backgroundColor: "#3E5622",
          }}
          onClick={(e) => {
            e.preventDefault();
            onEdit();
          }}
        >
          Edit
        </Button>
      </Card>
    </Link>
  );
}
