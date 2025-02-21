const About = () => {
    return (
      <div className="space-y-12">
        <section id="mission-vision" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              To provide innovative manufacturing solutions that exceed client expectations and drive industry progress.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              To be the global leader in custom manufacturing, known for quality, innovation, and customer satisfaction.
            </p>
          </div>
        </section>
  
        <section id="company-overview" className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
          <p>
            Founded in [year], our company has grown to become a leading provider of custom manufacturing solutions. With
            state-of-the-art facilities and a team of skilled professionals, we deliver high-quality products and services
            to clients across various industries.
          </p>
        </section>
  
        <section id="organizational-chart" className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Organizational Chart</h2>
          <div className="bg-gray-300 h-64 flex items-center justify-center">
            <p>Organizational Chart Placeholder</p>
          </div>
        </section>
  
        <section id="work-domain" className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Work Domain</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Automotive Manufacturing</li>
            <li>Aerospace Components</li>
            <li>Industrial Machinery</li>
            <li>Medical Devices</li>
            <li>Energy and Power Systems</li>
          </ul>
        </section>
      </div>
    )
  }
  
  export default About
  
  