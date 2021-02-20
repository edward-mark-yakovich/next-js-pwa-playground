import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav/nav';
import {request} from '../components/utils/helpers';

const CottStatic = ({data}) => {
  const pageContent = data?.[0] || {};
  const acf = pageContent?.acf || {};

  return (
    <div className="page page--dashboard-server">
      <Head>
        <title>Cott About</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav type="cott" />

      <div className="page__content">
        <div className="page__heading">
          <h1>About Static</h1>
        </div>

        <div className="page__copy">

          <div className="page__section">
            <h2>{acf?.metaTitle || ''}</h2>

            <p>{acf?.metaDescription || ''}</p>
          </div>

        </div>

      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const data = await request('http://edyakovich.com/test/headless-wordpress/wp-json/wp/v2/pages?slug=about')

  return {
    props: {data},
    revalidate: 1
  };
}

export default CottStatic;
