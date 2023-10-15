import { GetServerSideProps } from 'next';
import { ReactElement, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getFocusedCategoryState } from 'src/atoms/focusedCategory';
import PostContent from 'src/components/blocks/Content';
import Layout from 'src/components/layout/layout';
import { getAllPostIds, getPostData } from 'src/modules';
import PageSeo from 'src/seo/PageSeo';

interface P {
  postData: Post;
  isMobile: boolean;
}

const ContentPage = ({ isMobile, postData }: P) => {
  const { title, category } = postData;

  const seoData = {
    title: `${title} | ${category}`,
    description: `${title}`,
    keywords: `${category}, posts, ${title}`,
  };

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
      <PageSeo {...seoData} />
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
