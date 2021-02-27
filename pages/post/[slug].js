import React from 'react';
import Head from 'next/head';
import Nav from '../../components/nav/nav';
import { useRouter } from 'next/router';
import {request} from '../../components/utils/helpers';

const CottPost = ({data}) => {
  const router = useRouter();
  const pageContent = data?.[0] || {};
  const acf = pageContent?.acf || {};

  return (
    <div className="page page--cott-slug">
      <Head>
        <title>Cott Post</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav type="cott" />

      <div className="page__content">
        <div className="page__heading">
          <h1>Post Static</h1>
        </div>

        <div className="page__copy">

          <div className="page__section">

            {router.isFallback
              ? <p>Loading...</p>
              : <div className="post-page">

                  <div className="post-page__img">
                    <img src={pageContent?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''} />
                  </div>

                  <div className="post-page__content">
                    <h2 className="post-page__content-heading">{pageContent?.title?.rendered || ''}</h2>

                    <div
                      className="post-page__content-body"
                      dangerouslySetInnerHTML={{
                          __html: pageContent?.content?.rendered || ''
                      }}
                    />
                  </div>

                </div>
            }

          </div>

        </div>

      </div>
    </div>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const data = await request(`http://chinonthetank.com/wp-json/wp/v2/posts?_embed&slug=${params.slug}`, preview, previewData);

  return {
    props: {data},
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const allPosts = await request('http://chinonthetank.com/wp-json/wp/v2/posts?_embed&per_page=30');
  const pathSlugs = allPosts.map(node => `/post/${node.slug}`) || [];

  return {
    paths: pathSlugs,
    fallback: true
  }
}

export default CottPost;
