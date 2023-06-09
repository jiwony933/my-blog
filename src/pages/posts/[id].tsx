import { GetServerSideProps } from 'next';
import { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getFocusedCategoryState } from 'src/atoms/focusedCategory';
import PostContent from 'src/components/blocks/Content';
import Layout from 'src/components/layout/layout';
import { getAllPostIds, getPostData } from 'src/modules';

interface P {
  postData: Post;
  isMobile: boolean;
}

const ContentPage = ({ isMobile, postData }: P) => {
  const [focusedCategory, setFocusedCategory] = useRecoilState(
    getFocusedCategoryState
  );

  useEffect(() => {
    if (postData) {
      setFocusedCategory(postData.category);
    }
  }, [postData]);

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
