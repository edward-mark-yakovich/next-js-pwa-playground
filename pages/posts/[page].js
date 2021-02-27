import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Nav from '../../components/nav/nav';
import Pagination from '../../components/pagination/pagination';
import { useRouter } from 'next/router';
import {request} from '../../components/utils/helpers';

const CottPage = ({data, currentPage}) => {
  const router = useRouter();
  const posts = data;
  const goToPostPage = (page) => {
    router.push(`${page}`);
  }

  return (
    <div className="page page--cott-page">
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
                {posts && posts.map((post, index) => {
                  return (
                    <li className="post-listing__item" key={index}>
                      <Link href={`../post/${post.slug}`}>
                        <a>
                          <div className="post-listing__img">
                            <img src={post?._embedded?.['wp:featuredmedia']?.['0'].source_url || ''} />
                          </div>

                          <div className="post-listing__name">{post.slug}</div>
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>

              <Pagination
                currentPage={currentPage}
                handleChosenPage={(page) => goToPostPage(page)}
                endOfPages={false}
              />

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export async function getStaticProps({ params, preview = false, previewData }) {
  const perPage = params.perPage || 20;
  const page = params.page || 1;
  const data = await request(`http://chinonthetank.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}`, preview, previewData);

  return {
    props: {
      data,
      currentPage: page
    },
    revalidate: 1
  };
}

export async function getStaticPaths() {
  const perPage = '20';
  let pathsItems = [];

  while (perPage > pathsItems.length) {
    pathsItems.push({ params: { perPage: perPage, page: (pathsItems.length + 1).toString() } })
  }

  return {
    paths: pathsItems,
    fallback: true
  }
}

export default CottPage;
