import type { Metadata } from "next";
import { Providers } from './providers';
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { LanguageInitializer } from '@/components/LanguageInitializer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'RoboPact',
  description: 'Robot Pact Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageInitializer />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
