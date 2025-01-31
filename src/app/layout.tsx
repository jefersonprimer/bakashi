import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core'; 
config.autoAddCss = false;

import "./globals.css"; 

import type { Metadata } from "next"; 

import { ListsProvider } from './contexts/ListsContext';

import Header from "./components/layout/Header"; 
import Footer from './components/layout/Footer';

export const metadata: Metadata = {
  title: "Crunchyroll - Assista a Animes, Jogue Games e Compre Online",
  description: "create by primerdev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="pt-br">
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/3357695.webp" id='favicon'/>
        </head>
        <body>
          <Header />
          <ListsProvider>{children}</ListsProvider>
          <Footer />
        </body>
      </html>
  );
}
