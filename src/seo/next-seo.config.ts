import type { NextSeoProps } from 'next-seo';

export const DEFAULT_OG_IMAGE = '/seo-image.png';
export const DEFAULT_DESCRIPTION =
  '프론트엔드 개발자 김지원 기술 블로그 입니다.';
export const DEFAULT_KEYWORDS =
  'nextjs,react,typescript,frontend,webdev,dev,리액트,프론트엔드,웹개발,개발자,개발';

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: 'main',
  description: DEFAULT_DESCRIPTION,
  canonical: 'https://my-blog-iota-beige.vercel.app',
  titleTemplate: 'jiwonyyy blog - %s',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://my-blog-iota-beige.vercel.app',
    title: 'jiwonyyy blog',
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: '프론트엔드 개발자 김지원 기술 블로그',
        type: 'image/png',
      },
    ],
    siteName: 'jiwonyyy tech blog',
  },
};
