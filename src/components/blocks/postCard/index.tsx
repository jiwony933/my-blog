interface P {
  post: PostSummary;
}

const PostCard = ({ post }: P) => {
  return (
    <Container>
      <Title>{post.title}</Title>
      <Summary>글요약글요약</Summary>
      <Date>{post.date} 작성</Date>
    </Container>
  );
};

export default PostCard;

import styled from '@emotion/styled';
import { FlexColumnBox } from 'src/styles/common';

export const Container = styled(FlexColumnBox)`
  padding: 12px;
  gap: 4px;
`;

export const Title = styled.div`
  font-size: 24px;
`;

export const Summary = styled.div`
  color: var(--grey700);
`;

export const Date = styled.div``;
