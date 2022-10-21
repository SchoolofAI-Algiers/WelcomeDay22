import Navbar from '../components/Navbar';
import '../styles/globals.css';
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <>
          <Head>
        <title>SOAI ALGIERS WELCOMES YOU</title>
        <meta name='description' content='Welcome to SOAI Algiers' />
        <link rel='icon' href='/SOAIlogo.ico' />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
