import { Outlet } from "react-router";
import { Toaster } from "sonner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFAB from "./WhatsAppFAB";
import { AuthProvider } from "../context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFAB />
      </div>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
