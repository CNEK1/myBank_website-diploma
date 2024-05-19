import { Link } from "react-router-dom";
import styles from "./NewsCard.module.css";
import { NewsCardProps } from "./NewsCard.props";
function NewsCard(props: NewsCardProps) {
  return (
    <Link to={props.url} target="_blank" className={styles["link"]}>
      <div className={styles["card"]}>
        <div
          className={styles["head"]}
          style={{
            backgroundImage: `url("${props.image}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <button className={styles["favourite"]}>
            <img src="/favourite.svg" alt="favourite icon"></img>
          </button>
          <div className={styles["date"]}>{props.date}</div>
        </div>
        <div className={styles["footer"]}>
          <div className={styles["title"]}>{props.title}</div>
          <div className={styles["authors"]}>{props.authors}</div>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
