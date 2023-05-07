import { ReactElement } from 'react';
import Layout from 'src/components/layout/layout';

interface P {}

const ContentPage = ({}: P) => {
  return <div></div>;
};

export default ContentPage;

ContentPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
