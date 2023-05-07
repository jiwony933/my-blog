import { NextSeo } from 'next-seo';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  NEXT_SEO_DEFAULT,
} from './next-seo.config';

interface PageSeoProps {
  title: string;
  description: string;
  keywords: string;
  image?: string;
}

const DEFAULT_OG_IMAGE = '.png';

export default function PageSeo({
  title,
  description,
  keywords,
  image,
}: PageSeoProps) {
  const joinDescription = [description, DEFAULT_DESCRIPTION].join(' - ');
  const joinKeywords = [keywords, DEFAULT_KEYWORDS].join(',');
  return (
    <NextSeo
      {...NEXT_SEO_DEFAULT}
      title={title}
      description={joinDescription}
      additionalMetaTags={[
        {
          name: 'keywords',
          content: joinKeywords,
        },
      ]}
      openGraph={{
        ...NEXT_SEO_DEFAULT.openGraph,
        title,
        description: joinDescription,
        images: [
          {
            url: image || DEFAULT_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      }}
    />
  );
}
