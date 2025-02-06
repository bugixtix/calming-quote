import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head> 
        <meta name="description" content="A website with inspiring quotes and relaxing music" />
        </Head>
      <body className="antialiased body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
