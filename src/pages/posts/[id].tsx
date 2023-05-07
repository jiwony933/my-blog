import { ReactElement } from 'react';
import PostContent from 'src/components/blocks/post';
import Layout from 'src/components/layout/layout';
import { getAllPostIds, getPostData } from 'src/modules';

interface P {
  postData: any;
}

const ContentPage = ({ postData }: P) => {
  return <PostContent postData={postData} />;
};

export default ContentPage;

ContentPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
