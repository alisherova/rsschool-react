import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store, { RootState } from '../../store'; // Adjust the path according to your project structure
import '../styles/index.css'; // Import global styles
import { useEffect } from 'react';
import { setTheme } from '../../store/themeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ThemeProvider from '@/theme/ThemeProvider';

function App({ Component, pageProps }: AppProps) {

  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default App;