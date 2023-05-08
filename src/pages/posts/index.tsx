import { ReactElement } from 'react';
import Posts from 'src/components/blocks/PostList/posts';

import Layout from 'src/components/layout/layout';
import { getPostsData } from 'src/modules';

interface P {
  allPostsData: any;
}

const PostPage = ({ allPostsData }: P) => {
  return <Posts posts={allPostsData} />;
};

export default PostPage;

export async function getStaticProps() {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
