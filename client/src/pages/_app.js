import Head from "next/head";
import "@/styles/globals.css";
import "@/styles/styles.css";
import Nav from "@/components/nav";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "react-query";
import { useSession } from "next-auth/react";
import { SessionProvider } from "next-auth/react";
import Script from "next/script";

// Dynamically import the paypal-checkout module
const PayPalButton = dynamic(
  () =>
    import("paypal-checkout").then((mod) =>
      mod.Buttons.driver("react", { React, ReactDOM })
    ),
  { ssr: false } // This line is important. It's what prevents server-side render
);

const queryClient = new QueryClient();

export default function App({ Component, pageProps, session }) {
  const EnhancedComponent = (props) => (
    <Component {...props} PayPalButton={PayPalButton} />
  );

  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Exo&family=League+Spartan&family=Oswald&display=swap"
            rel="stylesheet"
          />
          <Script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></Script>
        </Head>
        <QueryClientProvider client={queryClient}>
          <Nav />
          <EnhancedComponent {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}
