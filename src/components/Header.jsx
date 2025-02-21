import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-gray-300">
              Services
            </Link>
          </li>
          <li>
            <Link to="/clients" className="hover:text-gray-300">
              Clients
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

