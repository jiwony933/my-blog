interface PostSummary {
  id: string;
  title: string;
  date: string;
  summary: string;
  category: string;
  pinned: boolean;
}

interface Post extends PostSummary {
  content: string;
}
