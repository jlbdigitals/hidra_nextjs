import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartContext";
import CartSidebar from "@/components/CartSidebar";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-nunito-sans",
});

export const metadata: Metadata = {
  title: "Hidra — Todo en Bombas de Agua y Filtros",
  description:
    "Distribuidores de bombas, sistemas de riego, válvulas, tuberías y control hidráulico para la industria y la agricultura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${nunito.variable} ${nunitoSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-white text-[#54595F] font-[family-name:var(--font-nunito)]">
        <CartProvider>
          <Header />
          <CartSidebar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
