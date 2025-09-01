import Footer from "@/components/footer";
import HeaderBar from "@/components/headerBar";
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <HeaderBar />
        <main className="flex-grow">
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
