import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Provider from "@/Redux/Provider";
import Toast from "@/Components/Toast";
import Cart from "@/Components/Cart";
import SessionWrapper from "@/Components/SessionWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Suva Hotel | Surkhet",
  description: " Experience comfort and luxury at Suva Hotel, Surkhet's premier destination for travelers seeking exceptional hospitality and unforgettable stays.",
};

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden" >

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased overflow-x-hidden `}
      >
        <SessionWrapper>
          <Provider>
            <Nav />
            {children}
            <Cart />
            <Footer />
            <Toast />
          </Provider>
        </SessionWrapper>
      </body>
    </html>
  );
}
