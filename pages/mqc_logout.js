import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = `_mq_myAppName_authToken=""`;
    sessionStorage.removeItem('_mq_myAppName_authToken');

    router.push('/');
  }

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <div className="page page--auth">
      <Head>
        <title>Logout</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page__content">
        <div className="page__heading">
          <h1>Logging out ... hold tight.</h1>
        </div>
      </div>
    </div>
  )
}

export default Logout;
