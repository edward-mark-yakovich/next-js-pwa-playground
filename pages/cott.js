import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Nav from '../components/nav/nav';
import {request} from '../components/utils/helpers';

const Cott = ({intro, categories}) => {
  const router = useRouter();
  const introContent = intro[0];

  return (
    <div className="page page--cott">
      <Head>
        <title>Cott</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav type="cott" />

      <div className="page__content">
        <div className="page__heading">
          <h1>Cott</h1>
        </div>

        <div className="page__copy">

          <div className="page__section">
            <h2>Cott Posts</h2>
            <button type="button" onClick={() => router.push('/posts/1')}>View Posts</button>

            <div className="home-intro">
              <div className="grid">
                <div className="home-intro__img">
                  <img src={introContent?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''} />
                </div>

                <div className="home-intro__content">
                  <h3
                    className="home-intro__heading"
                    dangerouslySetInnerHTML={{
                        __html: introContent?.title?.rendered || ''
                    }}
                  />

                  <div
                    className="home-intro__copy"
                    dangerouslySetInnerHTML={{
                        __html: introContent?.excerpt?.rendered || ''
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="home-categories">
              <h3>Categories</h3>

              <ul>
                {categories.map((category, index) => {
                  return (
                    <li key={index}>{category?.name || ''}</li>
                  );
                })}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const intro = await request('http://chinonthetank.com/wp-json/wp/v2/pages?_embed&slug=about');
  const categories = await request('http://chinonthetank.com/wp-json/wp/v2/categories');

  return {
    props: {
      intro: intro?.response || [],
      categories: categories?.response || []
    },
    revalidate: 1
  };
}

export default Cott;
