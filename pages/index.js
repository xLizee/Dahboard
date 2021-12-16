import { withPageAuthRequired, useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/dist/client/router";
import Hero from "../components/Hero";
import Content from "../components/Content";
import Dashboard from "../components/Dashboard";

export default function Index({ widgetsFromDB }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  widgetsFromDB = JSON.parse(widgetsFromDB);

  const refreshData = () => router.replace(router.asPath);

  return (
    <>
      {!isLoading && user && (
        <div>
          <Dashboard widgets={widgetsFromDB} refreshData={refreshData} />
        </div>
      )}
      {!user && (
        <div>
          <Hero />
          <hr />
          <Content />
        </div>
      )}
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const response = await fetch("http://localhost:8080/api/widgets/fetch", {
      headers: { Cookie: ctx.req.headers.cookie },
    });
    const formatted = await response.json();

    return {
      props: {
        widgetsFromDB: JSON.stringify(formatted),
      },
    };
  },
});
