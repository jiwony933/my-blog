import { ReactElement } from 'react';
import Posts from 'src/components/blocks/posts';
import Layout from 'src/components/layout/layout';
import { getPostsData } from 'src/modules';

interface P {
  allPostsData: any;
}

const PostPage = ({ allPostsData }: P) => {
  return <Posts posts={allPostsData} />;
};

export default PostPage;

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const allPostsData = getPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}
