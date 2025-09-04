import Footer from "@/components/core/footer";
import HeaderBar from "@/components/core/headerBar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { PagesTopLoader } from "nextjs-toploader/pages";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <HeaderBar />
        <main className="flex-grow">
          <PagesTopLoader
            color="#29D" // Color of the loading bar
            height={4} // Height in px
            speed={200} // Animation speed (lower is faster)
            shadow="0 0 10px #29D, 0 0 5px #29D" // Optional shadow
            showSpinner={false}
          />
          <Component {...pageProps} />
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
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
