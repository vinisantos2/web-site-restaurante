import { CartProvider } from "../contexts/CartContext";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" />
      </div>
    </CartProvider>
  );
}
