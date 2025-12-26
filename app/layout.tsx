import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Newman Properties LLC | Digital Real Estate",
  description: "Digital storefronts for local commercial properties in Tampa Bay. Find retail space, schedule tours, and connect with property managers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
