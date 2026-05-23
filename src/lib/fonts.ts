import localFont from "next/font/local";

export const fontDisplay = localFont({
  src: "../../public/fonts/fraunces-variable.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "100 900",
});

export const fontSans = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
});

export const fontMono = localFont({
  src: "../../node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "100 900",
});
