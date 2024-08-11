import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../../store';
import '../styles/index.css';
import ThemeProvider from '../theme/ThemeProvider';
import ErrorBoundary from "../../components/ErrorBoundary"

function App({ Component, pageProps }: AppProps) {

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
} 
export default App ;