import '@fortawesome/fontawesome-free/css/all.min.css';
// Font Awesome
import '@fortawesome/fontawesome-svg-core/styles.css';
// Configuração do Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core'; 
config.autoAddCss = false; 

import type { Metadata } from "next"; 
import Header from "./components/Header"; 
import Footer from './components/Footer';
import "./globals.css"; // CSS global

export const metadata: Metadata = {
  title: "Bakashi Tv - Assista Animes Grátis Online em FULL HD, HD E SD",
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
        {/* Link para o Google Fonts */}
        <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
      </head>
      <body>
          <Header /> 
          {children}
          <Footer/>
      </body>
    </html>
  );
}
