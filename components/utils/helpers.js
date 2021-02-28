import React, {useContext} from "react";
import nodeFetch from 'node-fetch';
import oauth2Client from 'client-oauth2';
import queryString from 'query-string';





// ****** check is logged in ******
export const isLoggedIn = () => {
  let hasAuthToken = null;

  if (typeof window !== "undefined") hasAuthToken = sessionStorage.getItem('_mq_myAppName_authToken');

  return hasAuthToken;
};



// ****** Request ******
export const request = async (endpoint, authKey = '', headerMeta = false) => {
  const needsAuth = endpoint.includes('machineq.net');
  let fullResponse = null;

  if (needsAuth && authKey === '') {
    const cookie = document.cookie;

    authKey = cookie.split('; ').find(row => row.startsWith('_mq_myAppName_authToken')).split('=')[1] || '';
  }

  return await nodeFetch(`${endpoint}`, {
           method: 'GET',
           headers: {
             ...(needsAuth && {Authorization: `Bearer ${authKey}`})
           }
         })
         .then(response => {
            if (headerMeta) fullResponse = response;

            if (response.status == 200) {
              return response.json();
            } else {
              console.warn('** Get Request Error');
            }
         })
         .then(data => {
            return {
              ...(headerMeta && {meta: {
                [headerMeta]: fullResponse.headers.get(headerMeta),
              }}),
              response: data
            };
          }
        );
};



// ****** isEmpty - Object ******
export const isEmptyObj = obj => Object.keys(obj).length === 0;



// ****** random string of length ******
export const generateRandomString = length => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};




// ****** oauth 2 ******
export const oauthConfig = (nonceState = 'preLogin', location) => {
  let nonceKey = generateRandomString(16);
  const redirectUri = `${location.origin}/auth`;

  if (nonceState === 'postLogin') nonceKey = queryString.parse(location.search).state;

  const oauthObj =  new oauth2Client({
    "clientId": "spacejam",
    "clientSecret": "undefined",
    "accessTokenUri": "https://oauth.dev.machineq.net/oauth2/token",
    "authorizationUri": "https://oauth.dev.machineq.net/oauth2/auth",
    "redirectUri": redirectUri,
    "scopes": ["offline", "openid", "hydra.consent"],
    state: nonceKey
  });

  return oauthObj;
};
