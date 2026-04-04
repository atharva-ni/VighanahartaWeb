import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  metadataBase: new URL("https://www.vighanahartaengineers.in"),
  manifest: "/site.webmanifest",
  title: {
    default: "Precision Manufacturing in Pune | Vighanaharta Engineers",
    template: "%s | Vighanaharta Engineers",
  },
  description:
    "ISO 9001:2015 certified partner for precision manufacturing Pune, CNC laser cutting, bending, welding, and industrial fabrication India solutions.",
  keywords: [
    "manufacturing company in Pune",
    "precision manufacturing Pune",
    "CNC laser cutting services",
    "industrial fabrication Pune",
    "welding services Maharashtra",
    "material handling equipment",
    "conveyor systems manufacturer",
    "ISO 9001 certified manufacturer",
    "engineering solutions India",
    "Vighanaharta Engineers",
    "metal fabrication Pune",
    "custom manufacturing",
    "MIG welding",
    "spot welding",
    "industrial equipment manufacturer",
    "sheet metal fabrication",
  ],
  authors: [{ name: "Vighanaharta Engineers" }],
  creator: "Vighanaharta Engineers",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.vighanahartaengineers.in",
    siteName: "Vighanaharta Engineers",
    title: "Precision Manufacturing in Pune | Vighanaharta Engineers",
    description:
      "Precision manufacturing and fabrication services from Pune including CNC laser cutting, welding, bending, and conveyor solutions.",
    images: [
      {
        url: "/services/s1.jpg",
        width: 1200,
        height: 630,
        alt: "Precision manufacturing and fabrication facility in Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Precision Manufacturing in Pune | Vighanaharta Engineers",
    description:
      "CNC laser cutting, bending, welding, and industrial fabrication services from Vighanaharta Engineers, Pune.",
    images: ["/services/s1.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/services/logo1.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION,
    },
  },
  alternates: {
    canonical: "https://www.vighanahartaengineers.in",
  },
};

export const viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className={`${inter.className} antialiased`}>
        <div className="flex flex-col min-h-screen">
          <ScrollProgress />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}


