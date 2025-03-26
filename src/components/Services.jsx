

import { Link } from "react-router-dom";
import React from 'react';

// Services data
const services = [
  {
    "id": 1,
    "name": "Material Handling & Storage Equipment",
    "description": "Customized solutions for efficient material management.",
    "image": "https://net-railing.cn/4-types-of-material-handling-equipment-you-should-know/"
  },
  {
    "id": 2,
    "name": "Logistics Equipment",
    "description": "Reliable and durable equipment for logistics and transportation.",
    "image": "https://www.keyence.com/ss/products/auto_id/logistics/role/material-handling.jsp"
  },
  {
    "id": 3,
    "name": "Engineering Services",
    "description": "Comprehensive engineering solutions for the automobile and civil sectors.",
    "image": "https://www.engineering.com/"
  },
  {
    "id": 4,
    "name": "Fabrication Support Services",
    "description": "Expertise in light and heavy fabrication with advanced machinery.",
    "image": "https://www.thefabricator.com/"
  },
  {
    "id": 5,
    "name": "Specialized Manufacturing",
    "description": "Manufacturing of industry-specific components like conveyors, ventilation systems, and pump assemblies.",
    "image": "https://www.industryweek.com/"
  },
  {
    "id": 6,
    "name": "Welding Services",
    "description": "Professional welding services, including spot welding, MIG, and CD projection.",
    "image": "https://www.lincolnelectric.com/"
  },
  {
    "id": 7,
    "name": "CNC Laser Cutting",
    "description": "Precise CNC laser cutting for various industrial applications.",
    "image": "https://www.lasertechnologies.com/"
  },
  {
    "id": 8,
    "name": "CNC Bending",
    "description": "Advanced CNC bending solutions for high-quality results.",
    "image": "https://www.amada.com/"
  }
];

// Manufacturing facilities data
const facilities = [
  { id: 1, name: "Arc & CO₂ Welding Machines", image: "src/assets/Images/Arc.jpg" },
  { id: 2, name: "Projection Welding Machines", image: "src/assets/Images/Projection.webp" },
  { id: 3, name: "Industrial LPG & Oxy-Acetylene Gas Cutting Sets", image: "src/assets/Images/Industrial LPG.jpg" },
  { id: 4, name: "Drill Machines", image: "src/assets/Images/drill.webp" },
  { id: 5, name: "Lathe Machines", image: "src/assets/Images/Lathe.webp" },
  { id: 6, name: "CNC Laser Cutting", image: "src/assets/Images/cnc.jpg" },
  { id: 7, name: "CNC Bending Machine", image: "src/assets/Images/cncbending.jpeg" }
];

// Services Component
const Services = () => {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={service.image}
              alt={service.name}
              className="mb-4 rounded-lg w-fit h-40 object-cover"
            />
            <h2 className="text-xl font-semibold mb-2 text-gray-700">{service.name}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link
              to={`/services/${service.id}`}
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
            >
              Learn more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// Manufacturing Facility Component
const ManufacturingFacility = () => {
  return (
    <div className="space-y-12 mt-16">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800">Manufacturing Facility</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {facilities.map((facility) => (
          <div
            key={facility.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={facility.image}
              alt={facility.name}
              className="mb-4 rounded-lg w-fit  h-40 object-cover"
            />
            <h2 className="text-xl font-semibold text-gray-700">{facility.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const App = () => {
  return (
    <div className="container mx-auto p-8">
      <Services />
      <ManufacturingFacility />
    </div>
  );
};

export default App;
