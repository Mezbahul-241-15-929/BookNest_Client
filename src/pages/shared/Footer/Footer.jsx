import { FaFacebook, FaGithub, FaTwitter, FaBook } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Logo + Description */}
        <div>
          <div className="flex items-center gap-2 text-white text-2xl font-bold">
            <FaBook className="text-indigo-500" />
            BookNest
          </div>

          <p className="mt-4 text-sm leading-relaxed">
            BookNest is your digital bookshelf where you can organize,
            discover, and review your favorite books. Build your reading
            journey and explore popular books loved by readers.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-indigo-400">
                Home
              </Link>
            </li>

            <li>
              <Link to="/bookshelf" className="hover:text-indigo-400">
                All Books
              </Link>
            </li>

            <li>
              <Link to="/addbook" className="hover:text-indigo-400">
                Add Book
              </Link>
            </li>

            <li>
              <Link to="/mybooks" className="hover:text-indigo-400">
                My Books
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Categories
          </h3>

          <ul className="space-y-2">
            <li className="hover:text-indigo-400 cursor-pointer">
              Fiction
            </li>

            <li className="hover:text-indigo-400 cursor-pointer">
              Fantasy
            </li>

            <li className="hover:text-indigo-400 cursor-pointer">
              Biography
            </li>

            <li className="hover:text-indigo-400 cursor-pointer">
              Self Development
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Connect With Us
          </h3>

          <div className="flex gap-4 text-xl">

            <a
              href="https://www.facebook.com/"
              className="hover:text-indigo-400 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="https://x.com/"
              className="hover:text-indigo-400 transition"
            >
              <FaTwitter />
            </a>

            <a
              href="https://github.com/"
              className="hover:text-indigo-400 transition"
            >
              <FaGithub />
            </a>

          </div>

          <p className="mt-4 text-sm">
            Email: support@booknest.com
          </p>
        </div>

      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">

        © {new Date().getFullYear()} BookNest. All rights reserved.

      </div>

    </footer>
  );
};

export default Footer;