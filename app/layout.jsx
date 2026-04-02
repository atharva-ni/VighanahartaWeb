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
  title: {
    default: "Vighanaharta Engineers | Precision Manufacturing & Fabrication in Pune",
    template: "%s | Vighanaharta Engineers",
  },
  description:
    "ISO 9001:2015 certified precision manufacturing and fabrication in Pune with CNC laser cutting, bending, welding, conveyor, and material handling solutions.",
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
    title: "Vighanaharta Engineers | Precision Manufacturing & Fabrication",
    description:
      "ISO 9001:2015 certified manufacturing, fabrication, and engineering solutions in Pune. 22+ years of expertise.",
    images: [
      {
        url: "/services/logo.png",
        width: 800,
        height: 600,
        alt: "Vighanaharta Engineers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vighanaharta Engineers | Precision Manufacturing & Fabrication",
    description:
      "ISO 9001:2015 certified manufacturing, fabrication, and engineering solutions in Pune.",
    images: ["/services/logo.png"],
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
      <head>
        <link rel="icon" href="/services/logo1.png" />
      </head>
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


