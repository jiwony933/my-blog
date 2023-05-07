interface PostSummary {
  id: string;
  title: string;
  date: string;
}

interface Post extends PostSummary {
  contentHtml: string;
}
