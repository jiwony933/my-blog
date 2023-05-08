import { useEffect } from 'react';
import Prism from 'prismjs';

interface P {
  postData: Post;
}

const PostContent = ({ postData }: P) => {
  // useEffect(() => {
  //   Prism.highlightAll();
  // }, []);

  const isMobile = useIsMobile();

  return (
    <Container>
      <Title isMobile={isMobile}>{postData.title}</Title>
      <Date isMobile={isMobile}>{postData.date} 에 작성됨</Date>
      <Content dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Container>
  );
};

export default PostContent;

import styled from '@emotion/styled';
import { FlexColumnBox, FlexEndBox } from 'src/styles/common';
import { useIsMobile } from 'src/hooks/useIsMobile';

export const Container = styled(FlexColumnBox)`
  gap: 12px;
`;

export const Title = styled.div<{ isMobile?: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '40px' : '44px')};
  font-weight: 600;
`;
export const Date = styled(FlexEndBox)<{ isMobile?: boolean }>`
  font-weight: 400;
  color: var(--grey700);
  font-size: ${({ isMobile }) => (isMobile ? '14px' : '18px')};
  margin-bottom: 80px;
`;

export const Content = styled.div`
  display: flex;
  gap: 12px;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  font-size: 18px;

  h1 {
    font-size: 40px;
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 18px;
  }

  h5 {
    font-size: 16px;
  }

  img {
    width: 100%;
  }

  p,
  li {
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 0.2em;
  }

  pre {
    background-color: #f5f5f5;
    padding: 12px;
  }

  ol,
  ul {
  }

  li {
    list-style-type: disc;

    ::marker {
      color: var(--blue500);
    }
  }
`;
