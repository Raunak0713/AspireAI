import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300","500","700","900"]
});

export const metadata: Metadata = {
  title: "AspireAI",
  description: "AI-powered productivity and job application assistant",
  icons : {
    icon : '/brain.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body className={`${poppins.className} antialiased`}>
          <ThemeProvider attribute={"class"} defaultTheme="light" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}  
            <Toaster /> 
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
