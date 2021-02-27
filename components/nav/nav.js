import React, { Fragment, useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import Head from 'next/head';

const Nav = ({type}) => {
  return (
    <nav className="nav">

      <Head>
        <meta charset='utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Keywords' />
        <title>Next.js PWA Example</title>

        <link rel='manifest' href='/manifest.json' />
        <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/apple-icon.png'></link>
        <meta name='theme-color' content='#317EFB' />
      </Head>

      {type === 'mqc' &&
        <ul className="nav__list">
          <li className="nav__list-item">
            <Link href='/mqc_dashboard'><a>Dashboard</a></Link>
          </li>
          <li className="nav__list-item">
            <Link href='/mqc_devices'><a>Devices</a></Link>
          </li>
          <li className="nav__list-item">
            <Link href='/mqc_dashboard_server'><a>Dashboard SSR</a></Link>
          </li>
          <li className="nav__list-item">
            <Link href='/mqc_logout'><a>Logout</a></Link>
          </li>
        </ul>
      }

      {type === 'cott' &&
        <ul className="nav__list">
          <li className="nav__list-item">
            <Link href='/cott'><a>Home</a></Link>
          </li>
          <li className="nav__list-item">
            <Link href='/posts/1'><a>Posts</a></Link>
          </li>
          <li className="nav__list-item">
            <Link href='/cott_about_static'><a>About Static</a></Link>
          </li>
          <li className="nav__list-item">
            <Link href='/'><a>Logout</a></Link>
          </li>
        </ul>
      }

    </nav>
  )
}

export default Nav;
