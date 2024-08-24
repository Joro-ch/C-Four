"use client";
import { Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import UserContextCompo from "./context/UserContextCompo";
import EmpresaContextCompo from "./context/EmpresaContextCompo";
import "./styles/globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className + " h-screen"}>
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
