import { NEXT_SEO_DEFAULT } from './next-seo.config';
import { NextSeo } from 'next-seo';

export default function DefaultSeo() {
  return <NextSeo {...NEXT_SEO_DEFAULT} />;
}
