import { FlexColumnBox } from 'src/styles/common';
import PostCard from '../postCard';
import MainPosts from './mainPosts';
import { useRouter } from 'next/router';

interface P {
  isMobile: boolean;
  posts: PostSummary[];
}

const Posts = ({ posts, isMobile }: P) => {
  const router = useRouter();
  const isAllPosts = router.asPath === '/posts';

  const mainPosts = posts.filter((post) => post.pinned);
  return (
    <FlexColumnBox>
      {isAllPosts && mainPosts.length > 0 && (
        <MainPosts mainPosts={mainPosts} isMobile={isMobile} />
      )}

      {posts.map((post) => (
        <PostCard key={post.id} post={post} isMobile={isMobile} />
      ))}
    </FlexColumnBox>
  );
};

export default Posts;
