import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "../contexts/CartContext";
import { ThemeProvider } from '@/contexts/ThemeContext'
import { whitelabelTheme } from '@/config/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider initialTheme={whitelabelTheme}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ThemeProvider>
  );
}
