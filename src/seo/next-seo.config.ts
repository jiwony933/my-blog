import type { NextSeoProps } from 'next-seo';

export const DEFAULT_OG_IMAGE = 'https://images.homing.haus/TRDSTAppIcon.png';
export const DEFAULT_DESCRIPTION = '프론트엔드 개발자 김지원';
export const DEFAULT_KEYWORDS = 'ㅇㅇㅇ';

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: 'main',
  description: DEFAULT_DESCRIPTION,
  // canonical: 'https://trdst.com',
  titleTemplate: 'jiwonyyy blog - %s',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    // url: 'https://trdst.com',
    title: 'jiwonyyy blog',
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Og Image Alt A',
        type: 'image/jpeg',
      },
    ],
    siteName: 'trdst',
  },
  twitter: {
    handle: '@handlea',
    site: '@sitea',
    cardType: 'summary_large_image',
  },
};
