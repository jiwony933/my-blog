import { ReactElement } from 'react';
import Layout from 'src/components/layout/layout';

interface P {}

const AboutPage = ({}: P) => {
  return (
    <div>
      <h2>안녕하세요</h2>
    </div>
  );
};

export default AboutPage;

AboutPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
