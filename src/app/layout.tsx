"use client";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import ErrorBoundary from "@/components/ErrorBoundary";
import { InitialLoadProvider } from "@/context/InitialLoadContext";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import { metadata } from "./head";

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { direction, language } = useLanguage();

  return (
    <html lang={language} dir={direction} className="scroll-smooth" suppressHydrationWarning>
      <head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta name="keywords" content={metadata.keywords as string} />
        {/* Add other meta tags as needed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Remove Inter - we're using Moderat exclusively for design consistency */}
      </head>
      <body className="antialiased font-moderat" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <InitialLoadProvider>
              {children}
            </InitialLoadProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LanguageProvider>
      <LayoutContent>{children}</LayoutContent>
    </LanguageProvider>
  );
}

