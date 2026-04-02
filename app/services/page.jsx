import ServicesContent from "@/components/ServicesContent";

export const metadata = {
  title: "Services",
  description:
    "Vighanaharta Engineers offers CNC laser cutting, bending, welding, material handling equipment, conveyor systems, fabrication services, and more. Full-service precision manufacturing in Pune, Maharashtra.",
  keywords: ["CNC laser cutting Pune", "welding services", "material handling equipment", "belt bucket conveyors", "fabrication services Pune", "industrial manufacturing"],
  alternates: {
    canonical: "https://vighanahartaengineers.in/services",
  },
  openGraph: {
    title: "Manufacturing Services — Vighanaharta Engineers",
    description:
      "CNC laser cutting, precision fabrication, welding, conveyor systems and more. Full-service engineering in Pune.",
    url: "https://vighanahartaengineers.in/services",
    images: [{ url: "/services/s1.jpg" }],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Vighanaharta Engineers Services",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: { "@type": "Service", name: "Material Handling & Storage Equipment", description: "Design and fabrication of trolleys, pallets, skids, base frames and storage systems." },
              },
              {
                "@type": "ListItem",
                position: 2,
                item: { "@type": "Service", name: "Logistics Equipment", description: "Heavy-duty logistic support equipment for efficient material flow." },
              },
              {
                "@type": "ListItem",
                position: 3,
                item: { "@type": "Service", name: "Auto & Engineering Assemblies", description: "Mechanical assemblies for automotive and engineering sectors." },
              },
              {
                "@type": "ListItem",
                position: 4,
                item: { "@type": "Service", name: "Fabrication Support Services", description: "Light and heavy structural fabrication services." },
              },
              {
                "@type": "ListItem",
                position: 5,
                item: { "@type": "Service", name: "Belt-Bucket Conveyors", description: "Conveyor systems for cement industries." },
              },
              {
                "@type": "ListItem",
                position: 6,
                item: { "@type": "Service", name: "Ventilation Systems", description: "Hood and pocket ventilation systems for paper industries." },
              },
              {
                "@type": "ListItem",
                position: 7,
                item: { "@type": "Service", name: "Pump Assembly Parts", description: "Components like base frames, tanks, and jackets for pumps." },
              },
              {
                "@type": "ListItem",
                position: 8,
                item: { "@type": "Service", name: "Welding Services", description: "Spot welding, MIG welding, CD projection welding services." },
              },
            ],
          },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://vighanahartaengineers.in" },
                { "@type": "ListItem", position: 2, name: "Services", item: "https://vighanahartaengineers.in/services" },
              ],
            },
          ]),
        }}
      />
      <ServicesContent />
    </>
  );
}

