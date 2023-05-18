import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import PostContent from 'src/components/blocks/Content';
import Layout from 'src/components/layout/layout';
import { getAllPostIds, getPostData } from 'src/modules';

interface P {
  postData: Post;
  isMobile: boolean;
}

const ContentPage = ({ isMobile, postData }: P) => {
  return (
    <Layout isMobile={isMobile}>
      <PostContent isMobile={isMobile} postData={postData} />
    </Layout>
  );
};

export default ContentPage;

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

// ContentPage.getLayout = function getLayout(
//   page: ReactElement,
//   isMobile: boolean
// ) {
//   return <Layout isMobile={isMobile}>{page}</Layout>;
// };
