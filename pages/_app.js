import "tailwindcss/tailwind.css";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "../components/Layout";
import { useRouter } from "next/dist/client/router";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  return (
    <UserProvider>
      {router.asPath != "/about.json" && (
        <Layout refreshData={refreshData}>
          <Component {...pageProps} refreshData={refreshData} />
        </Layout>
      )}
      {router.asPath == "/about.json" && (
          <Component {...pageProps} refreshData={refreshData} />
      )}
    </UserProvider>
  );
};

export default App;
