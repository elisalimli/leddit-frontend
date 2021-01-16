import { AppProps } from "next/app";
import "../styles/index.css";
import { ThemeProvider } from "next-themes";

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      {typeof window === "undefined" ? null : (
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
