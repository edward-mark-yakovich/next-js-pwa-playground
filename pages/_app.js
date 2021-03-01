import '../css/app.css';
import React from "react";
import { AppProvider } from '../components/AppContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <div className="app _emy_myAppName--v-1.1.0">
        <div className="app__inner">
          <Component {...pageProps} />
        </div>
      </div>
    </AppProvider>
  )
}
