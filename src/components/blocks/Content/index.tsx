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

export const Content = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.2em;
  width: 100%;
  overflow-y: scroll;
  line-height: 1.5;
  font-size: ${({ isMobile }) => (isMobile ? '16px' : '18px')};
  word-wrap: break-word;

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
    max-width: 100%;
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 0.2em;
  }

  pre {
    background-color: var(--blue50);
    padding: 12px;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 0.2em;
    overflow-x: scroll;

    code {
      font-size: 14px;
      line-height: 1.5;
    }
  }

  ol,
  ul {
    margin-left: 0;
    padding-left: 1.5em;
  }

  li {
    list-style-type: disc;

    ::marker {
      color: var(--blue500);
    }
  }
`;
