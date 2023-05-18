import styled from '@emotion/styled';

export const Content = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.3em;
  width: 100%;
  overflow-y: scroll;
  line-height: 1.5;
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '14px')};
  word-wrap: break-word;

  * {
  }

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
    font-size: ${({ isMobile }) => (isMobile ? '13px' : '16px')};
    line-height: 1.8em;
    margin-bottom: 0.2em;
    gap: 0.2em;

    code {
      padding: 0.2em 0.4em;
      border-radius: 4px;
      background-color: var(--grey100);
      color: var(--red800);
      font-size: 0.9em;
      font-weight: 500;
    }
  }

  blockquote {
    display: flex;
    flex-direction: column;
    gap: 0.4em;
    background-color: var(--grey100);
    margin: 1em 0;
    border-left: 4px solid var(--blue800);
    padding: 12px 16px;
    font-size: 18px;
    line-height: 1.5;
    margin-bottom: 0.2em;
  }

  ol,
  ul {
    margin-left: 0;
    padding-left: 1.5em;
  }

  pre {
    code {
    }
  }

  li {
    list-style-type: disc;

    ::marker {
      color: var(--grey800);
    }
  }
`;
