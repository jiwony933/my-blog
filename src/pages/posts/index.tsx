import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import Posts from 'src/components/blocks/PostList/posts';

import Layout from 'src/components/layout/layout';
import { getPostsData } from 'src/modules';
import NoPost from './no-post';

interface P {
  allPostsData: any;
}

const PostPage = ({ allPostsData }: P) => {
  if (allPostsData.length === 0) {
    return <NoPost />;
  }
  return <Posts posts={allPostsData} />;
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.query.category?.toString();
  const allPostsData = await getPostsData(category);

  return {
    props: {
      allPostsData,
    },
  };
};

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
