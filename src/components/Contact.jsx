import { MapPin, Phone, Mail, Clock } from "lucide-react"

const Contact = () => {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

      <section id="contact-form" className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input type="text" id="name" name="name" className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input type="email" id="email" name="email" className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">
              Message
            </label>
            <textarea id="message" name="message" rows={4} className="w-full p-2 border rounded" required></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Send Message
          </button>
        </form>
      </section>

      <section id="contact-info" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <ul className="space-y-4">
            <li className="flex items-center">
              <MapPin className="mr-2" />
              <span>123 Manufacturing St, Industrial City, 12345</span>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2" />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2" />
              <span>info@yourcompany.com</span>
            </li>
            <li className="flex items-center">
              <Clock className="mr-2" />
              <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Location Map</h2>
          <div className="bg-gray-300 h-64 flex items-center justify-center">
            <p>Map Placeholder</p>
          </div>
        </div>
      </section>

      <section id="social-media" className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Connect With Us</h2>
        <div className="flex justify-center space-x-4">
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Facebook
          </a>
          <a href="#" className="text-blue-400 hover:text-blue-500">
            Twitter
          </a>
          <a href="#" className="text-blue-700 hover:text-blue-800">
            LinkedIn
          </a>
          <a href="#" className="text-red-500 hover:text-red-600">
            YouTube
          </a>
        </div>
      </section>
    </div>
  )
}

export default Contact

