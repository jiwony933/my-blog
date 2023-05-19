interface P {
  post: PostSummary;
  isMobile: boolean;
}

const PostCard = ({ post, isMobile }: P) => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <Container>
      <CardWrapper onClick={handleCardClick}>
        <Title isMobile={isMobile}>{post.title}</Title>
        <Summary isMobile={isMobile}>{post.summary}</Summary>
        <Date>🖌️ {post.date}</Date>
      </CardWrapper>
    </Container>
  );
};

export default PostCard;

import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { FlexColumnBox } from 'src/styles/common';

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
  font-size: ${({ isMobile }) => (isMobile ? '18px' : '24px')};
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
  cursor: pointer;
  word-wrap: break-word;
`;

export const Date = styled.div`
  cursor: pointer;
`;
