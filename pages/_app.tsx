import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";
import "../src/styles/index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createPageProgressBar } from "../src/utils/createPageProgressBar";

function App({ Component, pageProps }: AppProps) {
  createPageProgressBar();

  return (
    <ThemeProvider attribute="class">
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}

export default App;
