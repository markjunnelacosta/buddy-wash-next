// import './globals.css'
import { Inter } from "next/font/google";
import { Suspense } from "react";
import Loader from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BuddyWash",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        This is a header This is Nav Bar
        {children}
        This is a footer
      </body>
    </html>
  );
}
