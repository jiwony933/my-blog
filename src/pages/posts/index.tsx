import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import Posts from 'src/components/blocks/PostList/posts';

import Layout from 'src/components/layout/layout';
import { getPostsData } from 'src/modules';
import NoPost from './no-post';
import { isEmptyArray } from 'src/utils/common';

interface P {
  category?: string;
  allPostsData: any;
}

const PostPage = ({ category, allPostsData }: P) => {
  return (
    <Layout focusedCategory={category}>
      {isEmptyArray(allPostsData) ? <NoPost /> : <Posts posts={allPostsData} />}
      <Posts posts={allPostsData} />
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
