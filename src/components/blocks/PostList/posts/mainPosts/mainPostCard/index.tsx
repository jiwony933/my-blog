import { FlexColumnBox } from 'src/styles/common';
import { Container, Date, Summary, Title } from './styles';

interface P {
  post: PostSummary;
  isMobile: boolean;
}

const MainPostCard = ({ post, isMobile }: P) => {
  return (
    <Container isMobile={isMobile}>
      <FlexColumnBox>
        <Title isMobile={isMobile}>{post.title}</Title>
        {!isMobile && <Summary>{post.summary}</Summary>}
      </FlexColumnBox>
      <Date>{post.date}</Date>
    </Container>
  );
};

export default MainPostCard;
