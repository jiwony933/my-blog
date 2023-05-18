import 'prismjs/themes/prism-okaidia.css';

interface P {
  postData: Post;
}

const PostContent = ({ postData }: P) => {
  const isMobile = useIsMobile();

  return (
    <Container className='post-content'>
      <Title isMobile={isMobile}>{postData.title}</Title>
      <Date isMobile={isMobile}>{postData.date} 에 작성됨</Date>
      <MarkdownViewer content={postData.content} />
    </Container>
  );
};

export default PostContent;

import styled from '@emotion/styled';
import { FlexColumnBox, FlexEndBox } from 'src/styles/common';
import { useIsMobile } from 'src/hooks/useIsMobile';
import MarkdownViewer from './MarkDownViewer';

export const Container = styled(FlexColumnBox)<{ isMobile?: boolean }>`
  gap: 12px;
  padding-bottom: 200px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Title = styled.div<{ isMobile?: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '30px' : '44px')};
  font-weight: 600;
`;
export const Date = styled(FlexEndBox)<{ isMobile?: boolean }>`
  font-weight: 400;
  color: var(--grey700);
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '18px')};
  margin-bottom: ${({ isMobile }) => (isMobile ? '20px' : '40px')};
`;
