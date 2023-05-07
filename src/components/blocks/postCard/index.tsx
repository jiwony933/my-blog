interface P {
  post: PostSummary;
}

const PostCard = ({ post }: P) => {
  return (
    <Container>
      <CardWrapper href={`/posts/${post.id}`}>
        <Title>{post.title}</Title>
        <Summary>{post.summary}</Summary>
        <Date>{post.date} 작성</Date>
      </CardWrapper>
    </Container>
  );
};

export default PostCard;

import styled from '@emotion/styled';
import Link from 'next/link';
import { FlexColumnBox } from 'src/styles/common';

export const Container = styled(FlexColumnBox)`
  padding: 24px 12px;
  gap: 4px;
  border: 0;
  border-bottom: 1px solid var(--grey400);
`;

export const CardWrapper = styled(Link)`
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Title = styled.div`
  font-size: 24px;
  :hover {
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s;
  }
`;

export const Summary = styled.div`
  color: var(--grey700);
  font-size: 18px;
  cursor: pointer;
`;

export const Date = styled.div`
  cursor: pointer;
`;
