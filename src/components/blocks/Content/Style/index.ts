import styled from '@emotion/styled';

export const Content = styled.div<{ isMobile?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: 100%;
  overflow-y: scroll;
  line-height: 1.5;
  font-size: ${({ isMobile }) => (isMobile ? '12px' : '14px')};
  word-wrap: break-word;

  * {
  }

  h1 {
    font-size: ${({ isMobile }) => (isMobile ? '30px' : '36px')};
  }

  h2 {
    font-size: ${({ isMobile }) => (isMobile ? '26px' : '32px')};
  }

  h3 {
    font-size: ${({ isMobile }) => (isMobile ? '20px' : '24px')};
  }

  h4 {
    font-size: ${({ isMobile }) => (isMobile ? '16px' : '18px')};
  }

  h5 {
    font-size: ${({ isMobile }) => (isMobile ? '14px' : '16px')};
  }

  img {
    width: 100%;
  }

  p,
  strong,
  li {
    max-width: 100%;
    font-size: ${({ isMobile }) => (isMobile ? '12px' : '16px')};
    line-height: 1.8em;
    margin-bottom: 0.2em;
    gap: 0.2em;

    code {
      padding: 0.2em 0.4em;
      border-radius: 4px;
      background-color: var(--grey100);
      color: var(--red800);
      font-size: ${({ isMobile }) => (isMobile ? '11px' : '0.9em')};
      font-weight: 500;
    }
  }

  code {
    span {
      background-color: none;
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
    font-size: ${({ isMobile }) => (isMobile ? '14px' : '18px')};
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
