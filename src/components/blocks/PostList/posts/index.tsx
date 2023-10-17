import { FlexColumnBox } from 'src/styles/common';
import PostCard from '../postCard';
import MainPosts from './mainPosts';
import { useRouter } from 'next/router';

interface P {
  isMobile: boolean;
  posts: PostSummary[];
}

const Posts = ({ posts, isMobile }: P) => {
  // '쿼리스트링이 없이 /posts로 접근했을 때'와 '쿼리스트링이 있을 때'를 구분하기 위해
  // isAllPosts라는 변수를 추가하였습니다.
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
