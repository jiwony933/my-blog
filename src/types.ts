interface PostSummary {
  id: string;
  title: string;
  date: string;
  summary: string;
}

interface Post extends PostSummary {
  content: string;
}
