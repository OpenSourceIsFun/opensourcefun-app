import { memo } from 'react';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { GoogleAnalytics, Header } from '@/components';
import { FacebookPixel } from '@/components/FacebookPixel';
import { facebookPixel, googleAnalyticsId } from '@/config/env';
import { MainLayout } from '@/layouts';
import fetchJson from '@/services/fetchJson';
import Providers from '@/providers';
import { checkIsIOS } from '@/utils/checkIsIOS';

import '../styles/global.css';

const meta = {
  title: 'Open Source is Fun',
  description:
    'Open Source is Fun is a community distribution platform & marketing tool that finds users with the relevant experience to your project.',
  viewport:
    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
};

const App = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="application-name" content={meta.title} />
        {checkIsIOS() && <meta name="viewport" content={meta.viewport} />}
        <meta name="apple-mobile-web-app-title" content={meta.title} />
        <meta property="og:title" content={meta.title} />
        <meta name="description" content={meta.description} />
        <meta property="og:description" content={meta.description} />
      </Head>
      <SWRConfig
        value={{
          fetcher: fetchJson,
        }}
      >
        <MainLayout>
          <Header />
          <Component {...pageProps} />
        </MainLayout>
        {googleAnalyticsId && <GoogleAnalytics id={googleAnalyticsId} />}
        {facebookPixel && <FacebookPixel id={facebookPixel} />}
      </SWRConfig>
    </>
  );
};

const MemoApp = memo(App);

const AppWrapper = (props: any): JSX.Element => {
  const { ...rest } = props;

  return (
    <Providers>
      <MemoApp {...rest} />
    </Providers>
  );
};

export default dynamic(() => Promise.resolve(AppWrapper), {
  ssr: false,
});
