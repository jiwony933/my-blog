import { NextPage } from 'next';
import Head from 'next/head';
import global from '../styles/global';
import '../styles/variable.css';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import Script from 'next/script';
import DefaultSeo from 'src/seo/DefaultSeo';
import { Global } from '@emotion/react';
import App, { AppContext } from 'next/app';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width'
        />
        지원 블로그
      </Head>
      <Script />
      <DefaultSeo />
      <Global styles={global} />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // //Mobile
  // const mobile = await userAgent?.indexOf('Mobi');
  // const isMobile = mobile !== -1;

  // //Mobile in pageProps -> 모비온에서 사용
  // appProps.pageProps.device = isMobile ? 'M' : 'W';

  //appBanner
  //@ts-ignore
  const isVisibleAppBanner = appContext.ctx.req?.cookies?.appInstallGnb;

  appProps.pageProps.appBanner = isVisibleAppBanner
    ? isVisibleAppBanner
    : undefined;

  return { ...appProps };
};
