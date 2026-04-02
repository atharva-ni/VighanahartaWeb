import HomeContent from "@/components/HomeContent";

export const metadata = {
  title: "Vighanaharta Engineers | Precision Manufacturing & Fabrication in Pune",
  description:
    "Precision manufacturing and fabrication in Pune with CNC laser cutting, bending, welding, conveyor systems, and material handling by Vighanaharta Engineers.",
  keywords: ["precision manufacturing Pune", "CNC laser cutting", "industrial fabrication", "welding services", "conveyor systems", "ISO 9001 manufacturer Pune"],
  alternates: {
    canonical: "https://www.vighanahartaengineers.in",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.vighanahartaengineers.in/#business",
              name: "Vighanaharta Engineers",
              url: "https://www.vighanahartaengineers.in",
              logo: "https://www.vighanahartaengineers.in/services/logo.png",
              image: "https://www.vighanahartaengineers.in/services/s1.jpg",
              description: "ISO 9001:2015 certified precision manufacturing, fabrication, and engineering solutions in Pune since 2017. Specializing in CNC laser cutting, welding, conveyor systems, and industrial equipment.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Gutt No. 1549, Plot No-2 Shelar Vasti, Dehu\u2013Alandi Road, Chikhali",
                addressLocality: "Pune",
                postalCode: "411062",
                addressRegion: "Maharashtra",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "18.689775",
                longitude: "73.798971",
              },
              telephone: "+919850952181",
              email: "vihanahartaengineers@gmail.com",
              foundingDate: "2017",
              priceRange: "$$",
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: { "@type": "GeoCoordinates", latitude: "18.689775", longitude: "73.798971" },
                geoRadius: "200000",
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                opens: "09:00",
                closes: "20:00",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "50",
                bestRating: "5",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Engineering Services",
                itemListElement: [
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "CNC Laser Cutting" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Precision Manufacturing" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Welding Services" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fabrication Support" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conveyor Systems" } },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Material Handling Equipment" } },
                ],
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Vighanaharta Engineers",
              url: "https://www.vighanahartaengineers.in",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.vighanahartaengineers.in/services?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
          ]),
        }}
      />
      <HomeContent />
    </>
  );
}


