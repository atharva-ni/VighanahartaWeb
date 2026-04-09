import HomeContent from "@/components/HomeContent";

export const metadata = {
  title: "Precision Manufacturing in Pune",
  description:
    "Precision manufacturing Pune partner for CNC laser cutting, bending, welding, conveyors, and industrial fabrication India with ISO-certified quality.",
  keywords: [
    "precision manufacturing Pune",
    "fabrication services Pune",
    "CNC laser cutting Pune",
    "industrial fabrication India",
    "conveyor systems manufacturer Pune",
    "welding and bending services",
  ],
  alternates: {
    canonical: "https://www.vighanahartaengineers.in",
  },
};

const industrialBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  "@id": "https://www.vighanahartaengineers.in/#industrial-business",
  name: "Vighanaharta Engineers",
  url: "https://www.vighanahartaengineers.in",
  image: [
    "https://www.vighanahartaengineers.in/services/s1.jpg",
    "https://www.vighanahartaengineers.in/services/s2.jpg",
  ],
  logo: "https://www.vighanahartaengineers.in/logo/mainlogotransparent.png",
  description:
    "Industrial manufacturing company in Pune delivering precision manufacturing and fabrication services including CNC laser cutting, bending, welding, and conveyor solutions.",
  telephone: "+91-98509-52181",
  email: "vihanahartaengineers@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Gat No. 1549, Plot No. 2, Shelar Vasti, Dehu-Alandi Road, Chikhali",
    addressLocality: "Pune",
    postalCode: "411062",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Pune",
    },
    {
      "@type": "State",
      name: "Maharashtra",
    },
    {
      "@type": "Country",
      name: "India",
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "CNC Laser Cutting Pune",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Sheet Metal Bending Services",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Industrial Welding and Fabrication",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Conveyor and Material Handling Systems",
      },
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+91-98509-52181",
      email: "vihanahartaengineers@gmail.com",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "mr"],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(industrialBusinessSchema),
        }}
      />
      <HomeContent />
    </>
  );
}


