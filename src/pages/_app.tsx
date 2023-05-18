import Head from 'next/head';
import global from '../styles/global';
import '../styles/variable.css';
import Script from 'next/script';
import DefaultSeo from 'src/seo/DefaultSeo';
import { Global } from '@emotion/react';
import App, { AppContext } from 'next/app';
import { useIsMobile } from 'src/hooks/useIsMobile';

function MyApp({ Component, pageProps }) {
  const isMobile = useIsMobile();
  const getMobileLayout = Component.getMobileLayout ?? ((page) => page);
  const getPcLayout = Component.getPcLayout ?? ((page) => page);
  const getLayout = isMobile ? getMobileLayout : getPcLayout;

  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width'
        />
      </Head>
      <Script />
      <DefaultSeo />
      <Global styles={global} />
      {getLayout(<Component isMobile={isMobile} {...pageProps} />)}
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
