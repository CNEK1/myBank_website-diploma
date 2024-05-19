import { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import { PREFIX } from "../../helpers/API";
import { NewsRoot } from "../../interfaces/news.interface";
import styles from "./News.module.css";
import axios, { AxiosError } from "axios";
import NewsList from "./NewsList/NewsList";

function News() {
  const [news, setNews] = useState<NewsRoot>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const getNews = async () => {
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      const { data } = await axios.get<NewsRoot>(
        `${PREFIX}?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22categoryUri%22%3A%22dmoz%2FBusiness%2FAccounting%22%7D%2C%7B%22lang%22%3A%22eng%22%7D%5D%7D%2C%22%24filter%22%3A%7B%22forceMaxDataTimeWindow%22%3A%2231%22%2C%22startSourceRankPercentile%22%3A60%2C%22endSourceRankPercentile%22%3A100%7D%7D&resultType=articles&articlesSortBy=date&includeArticleImage=true&includeArticleOriginalArticle=true&includeConceptImage=true&includeConceptDescription=true&includeSourceDescription=true&includeSourceRanking=true&apiKey=697e3469-85aa-4564-84c2-dcfd62c3c3bc`
      );
      setNews(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error.message);
      }
      setIsLoading(false);
      return;
    }
  };
  useEffect(() => {
    getNews();
  }, []);
  return (
    <>
      <div className={styles["head"]}>
        <Heading>News</Heading>
      </div>
      <div>
        {error && <>{error}</>}
        {!isLoading && <NewsList news={news!} />}
        {isLoading && <>Loading...</>}
      </div>
    </>
  );
}

export default News;
