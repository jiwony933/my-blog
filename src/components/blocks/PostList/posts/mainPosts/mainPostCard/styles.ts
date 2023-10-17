import styled from '@emotion/styled';
import { FlexColumnBox } from 'src/styles/common';

export const Container = styled(FlexColumnBox)<{ isMobile?: boolean }>`
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.24);
  padding: 1.2rem;
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  background-color: white;
  transition: all 0.3s ease;
  justify-content: space-between;
  overflow: hidden;
  gap: 0.5rem;

  :hover {
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    background-color: var(--blue50);
  }
`;

export const Title = styled.div<{ isMobile?: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '1.1rem' : '1.4rem')};
  font-weight: 700;
  cursor: pointer;
  color: var(--blue900);
  margin-bottom: 0.5rem;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Summary = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  color: var(--grey700);
`;

export const Date = styled.div`
  font-size: 0.9rem;
`;
