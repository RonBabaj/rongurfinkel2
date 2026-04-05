import type { Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "@/components/ThemeScript";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";
import { rootMetadata, buildJsonLdGraph } from "@/lib/seo";

export { rootMetadata as metadata };

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
/** Hebrew UI — pairs with `html[lang="he"]` rules in globals.css */
const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew"],
  variable: "--font-hebrew",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dce3ec" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildJsonLdGraph();

  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansHebrew.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeScript />
        <ThemeProvider>
          <LocaleProvider>
            <CustomCursor />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
