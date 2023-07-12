import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { Navbar, Footer } from '../components';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>

    <Script src="https://kit.fontawesome.com/88dd844062.js" crossorigin="anonymous" />
  </ThemeProvider>
);

export default MyApp;
