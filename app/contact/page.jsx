import ContactContent from "@/components/ContactContent";

export const metadata = {
  title: "Contact Us",
  description:
    "Contact Vighanaharta Engineers in Chikhali, Pune for precision manufacturing, fabrication, and engineering services with a fast project quote.",
  keywords: ["contact Vighanaharta Engineers", "manufacturing company contact Pune", "fabrication services inquiry", "engineering quote Pune"],
  alternates: {
    canonical: "https://www.vighanahartaengineers.in/contact",
  },
  openGraph: {
    title: "Contact Vighanaharta Engineers",
    description:
      "Get in touch for manufacturing and engineering solutions. Located in Pune, Maharashtra.",
    url: "https://www.vighanahartaengineers.in/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Vighanaharta Engineers",
              telephone: "+919850952181",
              email: "vihanahartaengineers@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Gutt No. 1549, Plot No-2 Shelar Vasti, Dehu–Alandi Road, Chikhali",
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
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "09:00",
                closes: "20:00",
              },
            },
          },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vighanahartaengineers.in" },
                { "@type": "ListItem", position: 2, name: "Contact Us", item: "https://www.vighanahartaengineers.in/contact" },
              ],
            },
          ]),
        }}
      />
      <ContactContent />
    </>
  );
}


