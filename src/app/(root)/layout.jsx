import Footer from "@/components/root/footer";
import Navbar from "@/components/root/navbar";
import { ContextProvider } from "@/context/context";

export default function RootLayout({ children }) {
  return (
    <ContextProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ContextProvider>
  );
}



