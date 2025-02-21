const Clients = () => {
    return (
      <div className="space-y-12">
        <section id="work-portfolio" className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Work Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-200 h-48 flex items-center justify-center">Portfolio Item 1</div>
            <div className="bg-gray-200 h-48 flex items-center justify-center">Portfolio Item 2</div>
            <div className="bg-gray-200 h-48 flex items-center justify-center">Portfolio Item 3</div>
          </div>
        </section>
  
        <section id="client-list" className="bg-gray-100 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Our Clients</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <li className="bg-white p-4 rounded shadow">Client 1</li>
            <li className="bg-white p-4 rounded shadow">Client 2</li>
            <li className="bg-white p-4 rounded shadow">Client 3</li>
            <li className="bg-white p-4 rounded shadow">Client 4</li>
          </ul>
        </section>
  
        <section id="case-studies" className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Case Studies</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Case Study 1: Automotive Parts Optimization</h3>
            <p className="mb-4">Brief description of the case study and its outcomes.</p>
            <a href="#" className="text-blue-500 hover:underline">
              Read full case study
            </a>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Case Study 2: Aerospace Component Manufacturing</h3>
            <p className="mb-4">Brief description of the case study and its outcomes.</p>
            <a href="#" className="text-blue-500 hover:underline">
              Read full case study
            </a>
          </div>
        </section>
  
        <section id="feedback" className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Client Feedback</h2>
          <div className="space-y-4">
            <blockquote className="italic bg-white p-4 rounded shadow">
              "Exceptional quality and service. Highly recommended!" - John Doe, CEO of XYZ Corp
            </blockquote>
            <blockquote className="italic bg-white p-4 rounded shadow">
              "Their expertise and attention to detail are unmatched." - Jane Smith, CTO of ABC Industries
            </blockquote>
          </div>
        </section>
      </div>
    )
  }
  
  export default Clients
  
  