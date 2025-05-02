import Footer from "@/components/root/footer";
import Navbar from "@/components/root/navbar";

export default function RootLayout({ children }) {
    return (
        <div>
            <main>
                <Navbar />
            </main>
            {children}
            <div>
                <Footer />
            </div>
        </div>
    )
}
