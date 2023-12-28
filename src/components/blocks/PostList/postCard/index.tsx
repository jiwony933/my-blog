import styled from '@emotion/styled';
import { CustomLink, FlexColumnBox } from 'src/styles/common';
interface P {
  post: PostSummary;
  isMobile: boolean;
}

const PostCard = ({ post, isMobile }: P) => {
  return (
    <Container>
      <CardWrapper>
        <CustomLink href={`/posts/${post.id}`}>
          <Title isMobile={isMobile}>{post.title}</Title>
        </CustomLink>
        <CustomLink href={`/posts/${post.id}`}>
          <Summary isMobile={isMobile}>{post.summary}</Summary>
        </CustomLink>
        <CustomLink href={`/posts/${post.id}`}>
          <Date>🖌️ {post.date}</Date>
        </CustomLink>
      </CardWrapper>
    </Container>
  );
};

export default PostCard;

export const Container = styled(FlexColumnBox)`
  padding: 24px 12px;
  gap: 4px;
  border-bottom: 1px solid var(--grey400);
`;

export const CardWrapper = styled(FlexColumnBox)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.div<{ isMobile: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '20px' : '24px')};
  word-break: break-all;
  line-height: 1.4em;
  font-weight: 500;

  :hover {
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s;
  }
`;

export const Summary = styled.div<{ isMobile: boolean }>`
  width: 100%;
  color: var(--grey700);
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '16px')};
  line-height: 1.4em;
  word-wrap: break-word;
`;

export const Date = styled.div``;
