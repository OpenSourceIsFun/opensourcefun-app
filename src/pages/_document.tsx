import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="facebook-domain-verification"
            content="kpa4q0e24rfflzhpsv3b4n80ured84"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body style={{ height: '100vh', width: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
