import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="space-y-12">
      <section id="aim" className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Company</h1>
        <p className="text-xl">Our aim is to provide top-quality manufacturing solutions.</p>
      </section>

      <section id="slideshow" className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Featured Projects</h2>
        <div className="bg-gray-300 h-64 flex items-center justify-center">
          <p>Slideshow Placeholder</p>
        </div>
      </section>

      <section id="key-offerings" className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Custom Fabrication</h3>
          <p>Tailored solutions for your unique needs.</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Repair & Maintenance</h3>
          <p>Keep your equipment running smoothly.</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Consulting Services</h3>
          <p>Expert advice for your manufacturing challenges.</p>
        </div>
      </section>

      <section id="e-brochure" className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Download Our E-Brochure</h2>
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Download PDF</button>
      </section>

      <section id="awards-certifications" className="bg-gray-100 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Awards and Certifications</h2>
        <ul className="list-disc list-inside">
          <li>ISO 9001:2015 Certified</li>
          <li>Best Manufacturer Award 2022</li>
          <li>Green Manufacturing Excellence</li>
        </ul>
      </section>

      <section id="client-feedback" className="bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Client Feedback</h2>
        <blockquote className="italic">
          "Exceptional quality and service. Highly recommended!" - John Doe, CEO of XYZ Corp
        </blockquote>
      </section>

      <section id="quick-navigation" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/about" className="bg-gray-200 p-4 rounded text-center hover:bg-gray-300">
          About Us
        </Link>
        <Link to="/services" className="bg-gray-200 p-4 rounded text-center hover:bg-gray-300">
          Services
        </Link>
        <Link to="/clients" className="bg-gray-200 p-4 rounded text-center hover:bg-gray-300">
          Clients
        </Link>
        <Link to="/contact" className="bg-gray-200 p-4 rounded text-center hover:bg-gray-300">
          Contact Us
        </Link>
      </section>
    </div>
  )
}

export default Home

