import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { CartProvider } from "react-use-cart";
import { useEffect, useState } from "react";
import { AuthStateContext } from "../context/authContext";
import Layout from "../components/layout/layout";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progress = new ProgressBar({
  size: 3,
  color: "red",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

function MyApp({ Component, pageProps }) {
  const [isClient, setClient] = useState(false);
  const router = useRouter();
  useEffect(() => setClient(true), []);

  if (!isClient) return null;
  const progress = new ProgressBar({
    size: 3,
    color: "black",
    delay: 100,
  });

  Router.events.on("routeChangeStart", progress.start);
  Router.events.on("routeChangeComplete", progress.finish);
  Router.events.on("routeChangeError", progress.finish);

  return (
    <CartProvider>
      <AuthStateContext>
        <Toaster />
        <Layout>
          <Component {...pageProps} key={router.asPath} />
        </Layout>
      </AuthStateContext>
    </CartProvider>
  );
}

export default MyApp;
