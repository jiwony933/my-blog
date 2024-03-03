import { CustomLink, FlexColumnBox } from 'src/styles/common';
import { Container, Date, Summary, Title } from './styles';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface P {
  post: PostSummary;
  isMobile: boolean;
}

const MainPostCard = ({ post, isMobile }: P) => {
  return (
    <CustomLink
      href={`/posts/${post.id}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <Container isMobile={isMobile}>
        <FlexColumnBox>
          <Title isMobile={isMobile}>{post.title}</Title>
        </FlexColumnBox>
        <Date>{post.date}</Date>
      </Container>
    </CustomLink>
  );
};

export default MainPostCard;
