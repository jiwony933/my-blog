import { FlexColumnBox } from 'src/styles/common';
import PostCard from '../postCard';

interface P {}

const Posts = ({}: P) => {
  return (
    <FlexColumnBox gap={12}>
      <PostCard />
      <PostCard />
    </FlexColumnBox>
  );
};

export default Posts;
