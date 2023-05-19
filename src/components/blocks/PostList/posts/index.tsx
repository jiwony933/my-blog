import { FlexColumnBox } from 'src/styles/common';
import PostCard from '../postCard';

interface P {
  isMobile: boolean;
  posts: PostSummary[];
}

const Posts = ({ posts, isMobile }: P) => {
  return (
    <FlexColumnBox>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isMobile={isMobile} />
      ))}
    </FlexColumnBox>
  );
};

export default Posts;
