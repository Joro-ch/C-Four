"use client";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/globals.css";
import { Toaster } from "sonner";
import UserContextCompo from "./context/UserContextCompo";
import EmpresaContextCompo from "./context/EmpresaContextCompo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + "h-screen"}>
        <UserContextCompo>
          <EmpresaContextCompo>
            <div className="flex flex-col h-full">
              <Toaster closeButton />
              <NavBar />
              {children}
              <Footer />
            </div>
          </EmpresaContextCompo>
        </UserContextCompo>
      </body>
    </html>
  );
}
