import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppContext } from '../components/AppContext';
import {isLoggedIn, oauthConfig} from '../components/utils/helpers';

const Auth = () => {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const handleRedirect = () => router.push('/mqc_dashboard');
  const handleLogout = () => router.push('/mqc_logout');
  const getAuthToken = () => {
    // oauthConfig - getToken - Promise - returns an Object
    oauthConfig('postLogin', location).code.getToken(location.href, { clientSecret: false })
      .then(data => {
        document.cookie = `_mq_myAppName_authToken=${data.accessToken}`;
        sessionStorage.setItem('_mq_myAppName_authToken', data.accessToken);

        handleRedirect();
      }).catch(() => {
        console.warn('Get Token Error');
        handleLogout();
      });
  }

  useEffect(() => {
    if (isLoggedIn()) {
      handleRedirect();
    } else {
      if (window.location.search !== '') {
        getAuthToken();
      } else {
        handleLogout();
      }
    }
  }, []);

  return (
    <div className="page page--auth">
      <Head>
        <title>Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page__content">
        <div className="page__heading">
          <h1>Redirecting ... hold tight.</h1>
        </div>
      </div>
    </div>
  )
}

export default Auth;
