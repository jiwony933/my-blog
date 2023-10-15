import MainPostCard from './mainPostCard';
import { Container, PostsWrapper, Title } from './styles';

interface P {
  mainPosts: PostSummary[];
  isMobile: boolean;
}

const MainPosts = ({ mainPosts, isMobile }: P) => {
  return (
    <Container>
      <Title>📌 Pinned</Title>
      <PostsWrapper isMobile={isMobile}>
        {mainPosts.map((post) => (
          <MainPostCard key={post.id} post={post} isMobile={isMobile} />
        ))}
      </PostsWrapper>
    </Container>
  );
};

export default MainPosts;
