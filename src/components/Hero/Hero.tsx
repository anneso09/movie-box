import styles from "./Hero.module.css";
import Image from "next/image";

type HeroProps = {
  title: string;
  description: string;
  img: string;
  isPromoted: boolean;
};

export default function Hero({ title, description, img, isPromoted }: HeroProps) {
  return (
    <section className={styles.hero}>
      <Image
        src={img}
        alt="Hero background"
        fill
        className={styles.heroImage}
        priority
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.promoted}>
          {isPromoted && "Promoting"}
          {!isPromoted && "Movie not yet out"}
        </p>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
}