import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ResortContentProvider } from "@/app/components/providers/ResortContentProvider";

export const metadata = {
  title: "Khyal Samut Resort",
  description: "A coastal paradise where luxury meets automation",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
        <head>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
        </head>
        <body
          className="font-sans overflow-x-hidden bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 antialiased selection:bg-resortGreen selection:text-white transition-colors duration-300"
        >
          <ResortContentProvider>
            <Header />
            <main>{children}</main>
            <Footer />
          </ResortContentProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
