import Footer from '@/components/core/Footer';
import Header from '@/components/core/Header';
import Loader from '@/components/core/Loader';
import { Providers } from '@/redux/provider';
import '@/styles/global.scss'
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Task-Tracker",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon/download.ico" sizes="any" />
      </head>
      <body suppressHydrationWarning={true} className={inter.className}>
        <Providers>
          <Loader/>
          <Toaster position="top-center" />
          <main className="container-fluid">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
