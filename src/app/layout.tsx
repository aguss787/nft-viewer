import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NFT Viewer",
  description: "View your NFTs on the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-black text-white min-h-screen min-w-screen flex flex-col">
          <div className="flex-auto flex flex-col items-center">{children}</div>
          <div className="min-w-screen flex justify-end">
            <a
              href="https://www.flaticon.com/free-icons/nft"
              title="nft icons"
              className="text-gray-400 text-xs"
            >
              Nft icons created by Freepik - Flaticon
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
