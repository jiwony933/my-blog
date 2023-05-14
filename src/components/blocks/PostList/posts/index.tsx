import { FlexColumnBox } from 'src/styles/common';
import PostCard from '../postCard';

interface P {
  focusedCategory?: string;
  posts: any[];
}

const Posts = ({ focusedCategory, posts }: P) => {
  return (
    <FlexColumnBox>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </FlexColumnBox>
  );
};

export default Posts;
