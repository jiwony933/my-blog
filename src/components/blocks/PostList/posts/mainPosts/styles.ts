import styled from '@emotion/styled';
import { FlexBox, FlexColumnBox, SpaceBetweenBox } from 'src/styles/common';

export const Container = styled(FlexColumnBox)`
  padding: 1.2rem;
  gap: 1rem;
  border-bottom: 1px solid var(--grey400);
`;

export const TitleWrapper = styled(SpaceBetweenBox)`
  align-items: center;
  padding: 0.1rem;
`;

export const ToggleButton = styled.button`
  height: auto;
  width: auto;
`;

export const PostsWrapper = styled(FlexBox)<{ isMobile?: boolean }>`
  gap: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  ${({ isMobile }) =>
    isMobile &&
    `
    flex-direction: column;
    height: auto;
    grid-template-columns: repeat(2, 1fr);
  `}
`;

export const Title = styled.div<{ isMobile?: boolean }>`
  font-size: 1.4rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
`;
