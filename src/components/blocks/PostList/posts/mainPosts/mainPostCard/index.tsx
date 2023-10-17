import { FlexColumnBox } from 'src/styles/common';
import { Container, Date, Summary, Title } from './styles';
import { useRouter } from 'next/router';

interface P {
  post: PostSummary;
  isMobile: boolean;
}

const MainPostCard = ({ post, isMobile }: P) => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/posts/${post.id}`);
  };
  return (
    <Container isMobile={isMobile} onClick={handleCardClick}>
      <FlexColumnBox>
        <Title isMobile={isMobile}>{post.title}</Title>
        {!isMobile && <Summary>{post.summary}</Summary>}
      </FlexColumnBox>
      <Date>{post.date}</Date>
    </Container>
  );
};

export default MainPostCard;
