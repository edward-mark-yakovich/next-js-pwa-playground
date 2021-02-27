import React from 'react';
import Head from 'next/head';
import Nav from '../components/nav/nav';
import {request} from '../components/utils/helpers';

const CottStatic = ({data}) => {
  const pageContent = data?.[0] || {};
  const acf = pageContent?.acf || {};

  return (
    <div className="page page--cott-about">
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
            <h2 className="post-page__content-heading">{pageContent?.title?.rendered || ''}</h2>

            <div
              className="post-page__content-body"
              dangerouslySetInnerHTML={{
                  __html: pageContent?.content?.rendered || ''
              }}
            />
          </div>

        </div>

      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const data = await request('http://chinonthetank.com/wp-json/wp/v2/pages?_embed&slug=about')

  return {
    props: {
      data: data?.response || []
    },
    revalidate: 1
  };
}

export default CottStatic;
