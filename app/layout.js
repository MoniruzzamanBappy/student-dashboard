import Navbar from "@/components/Navbar";
import QueryProvider from "@/components/QueryProvider";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Student Dashboard",
  description: "Create a student dashboard with Next.js by Md. Moniruzzaman",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <NextTopLoader
            color="#0CC2AA"
            startPosition={0.3}
            stopDelayMs={300}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: true }}
            shallowRouting
          />
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="p-6">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
