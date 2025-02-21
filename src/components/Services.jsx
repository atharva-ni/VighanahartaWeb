import { Link } from "react-router-dom"

const services = [
  { id: 1, name: "Custom Fabrication", description: "Tailored solutions for your unique manufacturing needs." },
  {
    id: 2,
    name: "Machine Parts Manufacturing",
    description: "Precision-engineered components for various industries.",
  },
  {
    id: 3,
    name: "Repair and Maintenance",
    description: "Keep your equipment running smoothly with our expert services.",
  },
  { id: 4, name: "Prototype Development", description: "Bring your ideas to life with rapid prototyping." },
  {
    id: 5,
    name: "Laser Cutting and Welding Services",
    description: "High-precision cutting and welding for various materials.",
  },
  { id: 6, name: "Metal Finishing", description: "Superior finishing touches for your metal products." },
  { id: 7, name: "Consulting Services", description: "Expert advice to optimize your manufacturing processes." },
]

const Services = () => {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link to={`/services/${service.id}`} className="text-blue-500 hover:underline">
              Learn more
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services

