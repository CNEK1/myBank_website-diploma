import NewsCard from "../../../components/NewsCard/NewsCard";
import { NewsListProps } from "./NewsList.props";
import styles from "./NewsList.module.css";

export function NewsList({ news }: NewsListProps) {
  return (
    <div className={styles.wrapper}>
      {news?.articles.results.map((n) => (
        <NewsCard
          id={n.uri}
          key={n.uri}
          url={n.url}
          title={n.title}
          authors={n.source.uri}
          date={n.date}
          image={n.image}
        />
      ))}
      ;
    </div>
  );
}
export default NewsList;
