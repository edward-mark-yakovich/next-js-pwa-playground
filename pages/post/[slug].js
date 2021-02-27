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
  const data = await request(`http://chinonthetank.com/wp-json/wp/v2/posts?_embed&slug=${params.slug}`);

  return {
    props: {
      data: data?.response || []
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const headerMetaItem = 'x-wp-total';
  const postsAvailable = await request(`http://chinonthetank.com/wp-json/wp/v2/posts`, '', headerMetaItem);
  const wpTotal = postsAvailable?.meta[headerMetaItem] || 0;
  const callsNeeded = Math.ceil(wpTotal / 100);

  let allPosts = [];
  let flattenedPosts = [];

  while (callsNeeded > allPosts.length) {
    const data = await request(`http://chinonthetank.com/wp-json/wp/v2/posts?_embed&page=${allPosts.length + 1}&per_page=100`);
    const posts = data?.response || [];

    allPosts.push(posts);
    flattenedPosts = [...flattenedPosts, ...posts];
  }

  const pathSlugs = flattenedPosts.map(node => `/post/${encodeURI(node.slug)}`) || [];

  return {
    paths: pathSlugs,
    fallback: true
  }
}

export default CottPost;
