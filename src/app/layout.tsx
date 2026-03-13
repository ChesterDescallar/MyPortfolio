import type { Metadata } from "next";
import { Inter, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SoundProvider } from "@/lib/sound";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Chester Descallar // Software Engineer",
  description: "Interactive technical case study — from legacy to optimized.",
  metadataBase: new URL("https://chesterdescallar.dev"),
  openGraph: {
    title: "Chester Descallar // Software Engineer",
    description: "Interactive technical case study — from legacy to optimized.",
    url: "https://chesterdescallar.dev",
    siteName: "Chester Descallar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Chester Descallar — Software Engineer",
      },
    ],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chester Descallar // Software Engineer",
    description: "Interactive technical case study — from legacy to optimized.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${geistMono.variable} ${playfair.variable} antialiased font-inter`}>
        <SoundProvider>
          {children}
        </SoundProvider>
        <Toaster position="top-right" richColors duration={1500} />
      </body>
    </html>
  );
}
