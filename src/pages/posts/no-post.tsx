interface P {}

const NoPost = ({}: P) => {
  return (
    <Container center>
      <div>작성된 포스트가 없습니다.</div>
    </Container>
  );
};

export default NoPost;

import styled from '@emotion/styled';
import { FlexBox } from 'src/styles/common';

export const Container = styled(FlexBox)`
  padding-top: 100px;
`;
