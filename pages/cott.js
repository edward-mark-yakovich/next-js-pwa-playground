import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/nav/nav';
import {request} from '../components/utils/helpers';

const Cott = ({posts}) => {
  return (
    <div className="page page--dashboard">
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

            <div className="post-listing">
              <ul className="grid">
                {posts.map((post, index) => {
                  return (
                    <li className="post-listing__item" key={index}>
                      <Link href={`posts/${post.slug}`}>
                        <a>
                          <div className="post-listing__img">
                            <img src={post?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''} />
                          </div>

                          <div className="post-listing__name">{post.slug}</div>

                          <div
                            className="post-listing__excerpt"
                            dangerouslySetInnerHTML={{
                                __html: post?.excerpt?.rendered || ''
                            }}
                          />
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  const posts = await request('http://edyakovich.com/test/headless-wordpress/wp-json/wp/v2/posts?_embed') || [];

  return {
    props: {posts},
    revalidate: 1
  };
}

export default Cott;
