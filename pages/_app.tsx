import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head'


export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title> Calming Quote</title>
      <link rel="icon" href="/favicon_.ico"/>
    </Head>
    <Component {...pageProps} />
  </>;
}
