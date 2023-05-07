interface P {}

const PostCard = ({}: P) => {
  return (
    <Container>
      <Title>글제목</Title>
      <Summary>
        글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약글요약요약
      </Summary>
      <Date>2023-03-03</Date>
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

export const Summary = styled.div``;

export const Date = styled.div``;
