export interface NewsRoot {
  articles: Articles;
}

export interface Articles {
  results: News[];
}

export interface News {
  uri: string;
  lang: string;
  isDuplicate: boolean;
  date: string;
  time: string;
  dateTime: string;
  dateTimePub: string;
  dataType: string;
  sim: number;
  url: string;
  title: string;
  body: string;
  source: Source;
  authors: string[];
  image: string;
  eventUri: string;
  sentiment: number;
  wgt: number;
  relevance: number;
}

export interface Source {
  uri: string;
  dataType: string;
  title: string;
}
