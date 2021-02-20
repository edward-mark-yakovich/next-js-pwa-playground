import React, {useEffect} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import {isLoggedIn, oauthConfig} from '../components/utils/helpers';

const Home = (test) => {
  const router = useRouter();
  const handleRedirect = () => router.push('/mqc_dashboard');
  const sendToAuth = () => {
    // oauthConfig - getUri - String
    const redirectUri = oauthConfig('preLogin', location).code.getUri();

    location = redirectUri;
  };

  useEffect(() => {
    if (isLoggedIn()) handleRedirect();
  }, []);

  return (
    <div className="page page--home">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page__content">
        <div className="page__heading">
          <h1>Home</h1>
        </div>

        <div className="page__copy">

          <div className="page__section">
            <h2>MQC</h2>

            <button type="button" onClick={() => sendToAuth()}>Sign In</button>
          </div>

          <div className="page__section">
            <h2>Cott</h2>

            <button type="button" onClick={() => router.push('/cott')}>View Blog</button>
          </div>

          <div className="page__section">
            <h2>Next notes</h2>

            <div className="page__section-notes">
              <ul>
                <li>
                  <b>getStaticProps</b> -
                    Use for something like a Blog.
                    Will statically build all html with initial data which was fetched at yarn-build time.
                    So when user hits this page its already built and ready to go with data.
                    But use relavidate in call, so when user hits the page, if new blog data had been published in WP
                    It will show old content for a second, then hydrate with the new content.
                </li>
                <li>
                  <b>getServerSideProps</b> -
                    Use for something like when data is always changing, but its fast data.
                    Will do a data fetch every time the user hits the page. Data fetch does not happen at yarn-build time.
                    So if there is a long call, or numerous calls, when a user tries to hit this page, it will take
                    a little bit for calls to finish and page to actually load. But necessary if its always constant
                    changing data. Accepts argument Context which you can grab cookies from within, so can put Auth
                    related things in cookies to grab inside here.
                </li>
                <li>
                  <b>Auth</b> -
                    Use an isomorphic fetch solution, fetch data on server or normal in browser, so it can do this inside
                    getServerSideProps. Auth data like token, put inside a Cookie so you can grab it in node land
                    inside getServerSideProps.
                </li>
                <li>
                  <b>MQ-Central</b> -
                    Probably still use normal SPA style data fetching inline in page? Not sure if getServerSideProps
                    is a better solution, as pages would take too long to initially hit since calls are slow / large data
                    or numerous large calls per page.
                </li>
                <li>
                  <b>Global state</b> -
                    React Context?
                    If doing normal data fetching inline, probably throw the data in React Context, so then if user hits
                    the page again, it initially loads with the data from Context, and then also does the call again
                    to update page with new data.
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home;
