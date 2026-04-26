import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import CartSidebar from "@/components/CartSidebar";
import WhatsAppButton from "@/components/WhatsAppButton";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Hidra — Todo en Bombas de Agua y Filtros",
  description:
    "Distribuidores de bombas, sistemas de riego, válvulas, tuberías y control hidráulico para la industria y la agricultura.",
  verification: {
    google: "HUDUY8JtTXbUWQuUdbTfpgzYuvc26ScBvm1JxT8HqbA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} h-full`} suppressHydrationWarning>
      <body 
        className="min-h-full flex flex-col bg-white text-[#171c21] font-[family-name:var(--font-manrope)]"
        suppressHydrationWarning
      >
        <CartProvider>
          <Header />
          <CartSidebar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-F37XS5MVP5" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F37XS5MVP5');
          `}
        </Script>
      </body>
    </html>
  );
}
