import AboutContent from "@/components/AboutContent";

export const metadata = {
  title: "About Us",
  description:
    "Learn about Vighanaharta Engineers — ISO 9001:2015 certified precision manufacturing company in Pune. Our mission, vision, team, and 22+ years of engineering expertise in fabrication and industrial solutions.",
  keywords: ["about Vighanaharta Engineers", "manufacturing company Pune", "ISO certified manufacturer", "engineering company Maharashtra", "industrial fabrication company"],
  alternates: {
    canonical: "https://vighanahartaengineers.com/about",
  },
  openGraph: {
    title: "About Vighanaharta Engineers",
    description:
      "ISO 9001:2015 certified, established in 2017, with 5000 sq.ft. manufacturing facility in Pune.",
    url: "https://vighanahartaengineers.com/about",
    images: [{ url: "/services/logo.png" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              mainEntity: {
                "@type": "Organization",
                name: "Vighanaharta Engineers",
                foundingDate: "2017",
                numberOfEmployees: { "@type": "QuantitativeValue", value: "20+" },
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Pune",
                  addressRegion: "Maharashtra",
                  addressCountry: "IN",
                },
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://vighanahartaengineers.com" },
                { "@type": "ListItem", position: 2, name: "About Us", item: "https://vighanahartaengineers.com/about" },
              ],
            },
          ]),
        }}
      />
      <AboutContent />
    </>
  );
}
