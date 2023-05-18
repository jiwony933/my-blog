import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { BsStars } from 'react-icons/bs';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import rehypeCodeTitles from 'rehype-code-titles';
import styled from '@emotion/styled';

interface Props {
  content: string;
}

export default function MarkdownViewer({ content }: Props) {
  //   const copyCodeBlock = (code: string) => {
  //     if (navigator.clipboard) {
  //       navigator.clipboard.writeText(code).catch(() => {
  //         alert('복사를 다시 시도해주세요.');
  //       });
  //     }
  //   };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeCodeTitles]}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <>
              {/* <button
                onClick={() => {
                  copyCodeBlock(String(children).replace(/\n$/, ''));
                }}
                className='z-10 absolute right-2 bottom-2 text-slate hover:text-white transition'
              >
                <MdContentPaste className='h-5 w-5' />
              </button> */}
              <SyntaxHighlighter
                language={match[1]}
                PreTag='div'
                style={vscDarkPlus}
                customStyle={{ margin: 0, paddingTop: 20, paddingBottom: 20 }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </>
          ) : (
            <code {...props}>{children}</code>
          );
        },
        table: ({ children }) => <table>{children}</table>,
        th: ({ children }) => <th>{children}</th>,
        pre: ({ children, ...props }) => <pre {...props}>{children}</pre>,
        strong: ({ children }) => <strong>{children}</strong>,
        img: (image) => (
          <Image
            src={image.src || ''}
            alt={image.alt || ''}
            width={500}
            height={500}
          />
        ),
        h2: ({ children }) => (
          <>
            <BsStars />
            <h2 id={String(children).replaceAll(' ', '-')}>{children}</h2>
          </>
        ),
        h3: ({ node, children, ...props }) => (
          <>
            <BsStars />
            <h3 {...props} id={String(children).replaceAll(' ', '-')}>
              {children}
            </h3>
          </>
        ),
        h4: ({ node, children, ...props }) => (
          <h4 {...props} id={String(children).replaceAll(' ', '-')}>
            {children}
          </h4>
        ),
        p: ({ node, className, ...props }) => <p {...props} />,
        blockquote: ({ node, className, ...props }) => (
          <blockquote {...props} />
        ),
        input: ({ node, className, ...props }) => <input {...props} />,
        a: ({ node, className, ...props }) => <a {...props} target='_blank' />,
        del: ({ node, className, ...props }) => <del {...props} />,
        li: ({ children }) => <li>{children}</li>,
        ol: ({ children, ordered, ...props }) => <ol {...props}>{children}</ol>,
        ul: ({ children }) => <ul>{children}</ul>,
        hr: ({ children }) => <hr>{children}</hr>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

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
