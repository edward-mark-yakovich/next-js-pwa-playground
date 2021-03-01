import React, {useContext} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/nav/nav';
import { AppContext } from '../components/AppContext';
import {request} from '../components/utils/helpers';

const Cott = ({intro, categories}) => {
  const appContext = useContext(AppContext);
  const introContent = intro[0];
  const updateCurrentPostPage = () => {
    let updatedPage = appContext.postCurrentPage + 1;

    appContext.setPostCurrentPage(updatedPage);
  }

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

            <div className="home-intro-top">
              <div>
                <button onClick={() => updateCurrentPostPage()}>Set post page</button>
                <span> = {appContext.postCurrentPage}</span>
              </div>
            </div>

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
