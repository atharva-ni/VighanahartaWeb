import ClientsContent from "@/components/ClientsContent";

export const metadata = {
  title: "Clients & Portfolio",
  description:
    "See Vighanaharta Engineers' manufacturing portfolio and trusted clients like Mahindra, Thermax, Beumer, and Forbes Marshall across industries.",
  keywords: ["Vighanaharta Engineers clients", "manufacturing portfolio Pune", "industrial fabrication projects", "engineering project showcase"],
  alternates: {
    canonical: "https://www.vighanahartaengineers.in/clients",
  },
  openGraph: {
    title: "Clients & Portfolio — Vighanaharta Engineers",
    description:
      "Our portfolio of successful projects and trusted clients across automotive, energy, and manufacturing industries.",
    url: "https://www.vighanahartaengineers.in/clients",
    images: [{ url: "/services/logo.png" }],
  },
};

export default function ClientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              name: "Clients & Portfolio",
              description:
                "View Vighanaharta Engineers portfolio of successful manufacturing projects and trusted clients.",
              url: "https://www.vighanahartaengineers.in/clients",
              mainEntity: {
                "@type": "ItemList",
                name: "Featured Projects",
                numberOfItems: 19,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://www.vighanahartaengineers.in" },
                { "@type": "ListItem", position: 2, name: "Clients & Portfolio", item: "https://www.vighanahartaengineers.in/clients" },
              ],
            },
          ]),
        }}
      />
      <ClientsContent />
    </>
  );
}


