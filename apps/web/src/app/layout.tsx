import type { Metadata, Viewport } from "next";

import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/jetbrains-mono/wght.css";
import { SkipLink } from "@/components/accessibility/skip-link";

import { ThemeScript } from "@/components/theme/theme-script";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Khasandjon Babadzhanov — Software Developer",
    template: "%s | Khasandjon Babadzhanov",
  },
  description:
    "Backend-focused Software Developer building business applications, APIs, integrations, and automation.",
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#F6F8FB",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#08111F",
    },
  ],
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>

      <body>
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
