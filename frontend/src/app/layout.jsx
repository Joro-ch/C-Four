"use client";
import { Inter } from "next/font/google";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./styles/globals.css";
import { Toaster } from "sonner";
import UserContextCompo from "./context/UserContextCompo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + "h-screen"}>
        <UserContextCompo>
          <div className="flex flex-col h-full">
            <Toaster closeButton />
            <NavBar />
            {children}
            <Footer />
          </div>
        </UserContextCompo>
      </body>
    </html>
  );
}
