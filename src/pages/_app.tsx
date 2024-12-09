import '../styles/globals.css';
import Layout from '@/components/Layout';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer />
    </Layout>
  );
}

export default MyApp;
