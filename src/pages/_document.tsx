import { createGetInitialProps } from "@mantine/next";
import Document, { Head, Html, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

const title = "CLHS Scoreboard";
const description =
  "一鍵查詢、響應式設計並支援黑暗模式。為使用者著想的開源壢中成績查詢平台";
const homepageUrl = "https://clhs-scoreboard.vercel.app/";
const imageUrl = "https://i.imgur.com/lLbSDIy.png";

class MyDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html>
        <Head>
          {/* PWA */}
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
          <meta name="theme-color" content="#222" />

          {/* Primary Meta Tags */}
          <meta name="title" content={title} />
          <meta name="description" content={description} />

          {/* Open Graph / Facebook  */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={homepageUrl} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={imageUrl} />

          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={homepageUrl} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={imageUrl} />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
