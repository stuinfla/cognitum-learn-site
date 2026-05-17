import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "learn-rv — your own AI, on a device you actually own",
  description:
    "Turn any video, podcast, or PDF into a private knowledge base that lives on your Cognitum One Seed. No cloud accounts. No monthly fees. Nothing leaves your hardware.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none"
             style={{
               backgroundImage:
                 "linear-gradient(rgba(30,41,59,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.08) 1px, transparent 1px)",
               backgroundSize: "48px 48px",
             }} />
        {children}
      </body>
    </html>
  );
}
