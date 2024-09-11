import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Your custom global styles
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { CartProvider } from "@/context/CartContext"; // Cart Context Provider
import { Toaster } from "sonner"; // For showing notifications

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile - Ecommerce",
  description: "xyz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body> {/* Apply Google font globally */}
        <CartProvider>
          {children}
        </CartProvider>
        <Toaster /> {/* Toast notifications */}
      </body>
    </html>
  );
}
