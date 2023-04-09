import styled from '@emotion/styled';

export const FlexBox = styled.div<{
  gap?: number;
  center?: boolean;
  width?: 'auto' | 'full';
}>`
  position: relative;
  display: flex;
  justify-content: ${({ center }) => (center ? 'center' : 'flex-start')};
  align-items: center;
  gap: ${({ gap }) => (gap ? `${gap}px` : '0')};
  width: ${(props) => (props.width === 'auto' ? 'auto' : '100%')};
`;

export const FlexColumnBox = styled.div<{
  gap?: number;
  width?: 'auto' | 'full';
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ gap }) => (gap ? `${gap}px` : '0')};
  width: ${(props) => (props.width === 'auto' ? 'auto' : '100%')};
`;

export const GridColumnBox = styled.div<{ gap?: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: ${(props) => props.gap || '16px'};
  justify-items: center;
  padding-bottom: 40px;
`;

export const HorizontalScrollBox = styled.div<{ gap?: number }>`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  gap: ${({ gap }) => (gap ? `${gap}px` : '0')};

  width: 100%;
  flex: 1;
  justify-content: flex-start;
  align-items: center;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HorizontalCenterBox = styled(FlexBox)`
  height: 100%;
  align-items: center;
`;

export const SpaceBetweenBox = styled(FlexBox)`
  justify-content: space-between;
  width: 100%;
`;

export const FlexEndBox = styled(FlexBox)`
  justify-content: flex-end;
`;
