import { GetServerSideProps } from 'next';
import Posts from 'src/components/blocks/PostList/posts';
import Layout from 'src/components/layout/layout';
import { getPostsData } from 'src/modules';
import NoPost from './no-post';
import { isEmptyArray } from 'src/utils/common';
import { NextSeoProps } from 'next-seo';
import PageSeo from 'src/seo/PageSeo';

interface P {
  category?: string;
  allPostsData: any;
}

const PostPage = ({ category, allPostsData }: P) => {
  const seoData = {
    title: `${category} posts`,
    description: `${category} 관련 포스팅을 확인하실 수 있습니다.`,
    keywords: `${category}, posts`,
  };

  return (
    <Layout focusedCategory={category}>
      <PageSeo {...seoData} />
      {isEmptyArray(allPostsData) ? <NoPost /> : <Posts posts={allPostsData} />}
    </Layout>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.query.category?.toString() || '';
  const allPostsData = await getPostsData(category);

  return {
    props: {
      allPostsData,
      category,
    },
  };
};
