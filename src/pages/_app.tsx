import Head from 'next/head';
import global from '../styles/global';
import '../styles/variable.css';
import Script from 'next/script';
import DefaultSeo from 'src/seo/DefaultSeo';
import { Global } from '@emotion/react';
import App, { AppContext } from 'next/app';
import { useIsMobile } from 'src/hooks/useIsMobile';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
  const isMobile = useIsMobile();
  const getMobileLayout = Component.getMobileLayout ?? ((page) => page);
  const getPcLayout = Component.getPcLayout ?? ((page) => page);
  const getLayout = isMobile ? getMobileLayout : getPcLayout;

  return (
    <>
      <RecoilRoot>
        <Head>
          <meta
            name='viewport'
            content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width'
          />
          <meta
            name='google-site-verification'
            content='EgsEG20wT_CamoDor-iH3yAvBCPOlEjOBOBX71V8ZFw'
          />
        </Head>
        <Script />
        <DefaultSeo />
        <Global styles={global} />
        {getLayout(<Component isMobile={isMobile} {...pageProps} />)}
      </RecoilRoot>
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
