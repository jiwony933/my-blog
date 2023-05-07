import { FlexColumnBox } from 'src/styles/common';
import PostCard from '../postCard';

interface P {
  posts: any[];
}

const Posts = ({ posts }: P) => {
  return (
    <FlexColumnBox gap={12}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </FlexColumnBox>
  );
};

export default Posts;
