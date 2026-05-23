import { MotionConfig } from "framer-motion";

import { fontDisplay, fontSans, fontMono } from "@/lib/fonts";
import { defaultMetadata, personSchema } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Nav } from "@/components/layout/nav";
import { Cursor } from "@/components/layout/cursor";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { Footer } from "@/components/sections/footer";
import { GrainOverlay } from "@/components/primitives/grain-overlay";

import "./globals.css";

export const metadata = defaultMetadata;

export const viewport = {
  themeColor: "#0A0A0B",
  width: "device-width",
  initialScale: 1,
  // Allow zoom — disabling it is an accessibility anti-pattern
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(fontDisplay.variable, fontSans.variable, fontMono.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-accent/20 selection:text-accent">
        {/* JSON-LD: structured data for search engines & AI crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <GrainOverlay opacity={0.04} />
          <ScrollProgress />
          <Cursor />
          <Nav />
          <MotionConfig reducedMotion="user">{children}</MotionConfig>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
