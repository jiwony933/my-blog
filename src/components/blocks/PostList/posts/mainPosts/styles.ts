import styled from '@emotion/styled';
import { FlexBox, FlexColumnBox } from 'src/styles/common';

export const Container = styled(FlexColumnBox)`
  padding: 1rem;
`;

export const PostsWrapper = styled(FlexBox)<{ isMobile?: boolean }>`
  gap: 20px;
  height: 150px;

  ${({ isMobile }) =>
    isMobile &&
    `
    flex-direction: column;
    height: auto;
  `}
`;

export const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;
