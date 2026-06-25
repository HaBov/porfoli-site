import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Khasandjon Babadzhanov — Software Developer",
    template: "%s | Khasandjon Babadzhanov",
  },
  description:
    "Backend-focused Software Developer building business applications, APIs, integrations, and automation.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
