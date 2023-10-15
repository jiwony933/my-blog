import { FlexColumnBox } from 'src/styles/common';
import PostCard from '../postCard';
import MainPosts from './mainPosts';

interface P {
  isMobile: boolean;
  posts: PostSummary[];
}

const Posts = ({ posts, isMobile }: P) => {
  const mainPosts = posts.slice(0, 3);
  return (
    <FlexColumnBox>
      <MainPosts mainPosts={mainPosts} isMobile={isMobile} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isMobile={isMobile} />
      ))}
    </FlexColumnBox>
  );
};

export default Posts;
