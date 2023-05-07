import { ReactElement } from 'react';
import Posts from 'src/components/blocks/posts';
import Layout from 'src/components/layout/layout';

interface P {}

const PostPage = ({}: P) => {
  return <Posts />;
};

export default PostPage;

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
