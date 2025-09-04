import Footer from "@/components/core/footer";
import HeaderBar from "@/components/core/headerBar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { Toaster } from "react-hot-toast";
import { PagesTopLoader } from "nextjs-toploader/pages";
import { parse } from "cookie";

export default function MyApp({
  Component,
  pageProps,
  authData,
}: AppProps & {
  authData: { userId: string | null; username: string | null };
}) {
  return (
    <AuthProvider
      initialUserId={authData.userId}
      initialUsername={authData.username}
    >
      <div className="min-h-screen flex flex-col">
        <HeaderBar />
        <main className="flex-grow">
          <PagesTopLoaderWrapper />
          <Component {...pageProps} />
          <ToastWrapper />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
MyApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);

  const req = appContext.ctx.req;
  let authData: { userId: string | null; username: string | null } = {
    userId: null,
    username: null,
  };

  if (req) {
    const cookies = req.headers.cookie ? parse(req.headers.cookie) : {};
    authData.userId = cookies.user_id || null;
    authData.username = cookies.username || null;
  }

  return {
    ...appProps,
    authData,
  };
};
const ToastWrapper = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        success: {
          style: {
            background: "green",
            color: "white",
          },
        },
        error: {
          style: {
            background: "red",
            color: "white",
          },
        },
      }}
    />
  );
};
const PagesTopLoaderWrapper = () => {
  return (
    <PagesTopLoader
      color="#2299DD"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={true}
      easing="ease"
      speed={200}
      shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
      zIndex={1600}
      showAtBottom={false}
    />
  );
};
