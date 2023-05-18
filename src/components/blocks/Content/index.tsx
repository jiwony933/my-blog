import { useEffect } from 'react';
import Prism from 'prismjs';
import marked from 'marked';
import 'prismjs/themes/prism-okaidia.css';

interface P {
  postData: Post;
}

const PostContent = ({ postData }: P) => {
  const isMobile = useIsMobile();

  return (
    <Container>
      <Title isMobile={isMobile}>{postData.title}</Title>
      <Date isMobile={isMobile}>{postData.date} 에 작성됨</Date>

      {/* <Content
        className='content'
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      /> */}
    </Container>
  );
};

export default PostContent;

import styled from '@emotion/styled';
import { FlexColumnBox, FlexEndBox } from 'src/styles/common';
import { useIsMobile } from 'src/hooks/useIsMobile';

export const Container = styled(FlexColumnBox)<{ isMobile?: boolean }>`
  gap: 12px;
  padding-bottom: 200px;
  padding-left: ${({ isMobile }) => (isMobile ? '0px' : '40px')};
  padding-right: ${({ isMobile }) => (isMobile ? '0px' : '100px')};
`;

export const Title = styled.div<{ isMobile?: boolean }>`
  font-size: ${({ isMobile }) => (isMobile ? '32px' : '44px')};
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
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '14px')};
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
    font-size: ${({ isMobile }) => (isMobile ? '13px' : '15px')};
    line-height: 1.5;
    margin-bottom: 0.2em;
    gap: 0.2em;

    code {
      color: var(--red800);
      font-weight: 500;
      background-color: var(--grey100);
      padding: 2px 4px;
      border-radius: 4px;
      font-size: 14px;
      line-height: 1.5;
    }
  }

  blockquote {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    background-color: var(--grey100);
    margin: 1em 0;
    border-left: 4px solid var(--blue800);
    padding: 12px 18px;
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
      color: var(--grey800);
    }
  }
`;
