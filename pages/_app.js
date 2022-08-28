import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

import { CartProvider } from "react-use-cart";
import { useEffect, useState } from "react";
import { AuthStateContext } from "../context/authContext";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  const [isClient, setClient] = useState(false);

  useEffect(() => setClient(true), []);

  if (!isClient) return null;

  return (
    <CartProvider>
      <AuthStateContext>
        <Toaster />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthStateContext>
    </CartProvider>
  );
}

export default MyApp;
