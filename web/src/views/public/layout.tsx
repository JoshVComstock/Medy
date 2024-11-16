import { MapPin, Phone, Menu, X } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (link: string) => {
    const id = link.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const NameLinkes = [
    { name: "Inicio", link: "#inicio" },
    { name: "Que son", link: "#queson" },
    { name: "Tipos", link: "#tipos" },
    { name: "Centros", link: "#centros" },
    { name: "Contactos", link: "#contacto" },
  ];

  return (
    <div className="h-full w-full">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="h-auto md:h-20 relative">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4 md:px-6 lg:px-40">
              {/* Logo */}
              <div className="flex items-center flex-col">
                <div className="text-teal-500 text-2xl md:text-3xl font-bold">
                  Medi<span className="text-teal-400">sync</span>
                </div>
                <div className="text-gray-500 text-xs ml-1">
                  Pesquisas Unifranz
                </div>
              </div>

              {/* Contact Info & Login - Hidden on mobile */}
              <div className="hidden md:flex items-center gap-4 lg:gap-10 text-gray-600 text-sm">
                <div className="hidden lg:flex items-center gap-4">
                  <MapPin className="text-primary-500 w-4" />
                  <span className="hidden xl:inline">123 Arling, Mola, NY</span>
                  <Phone className="text-primary-500 w-4" />
                  <span>(+591) 68540240</span>
                </div>
                <Link
                  to="/login"
                  className="px-6 lg:px-8 py-2 lg:py-3 text-teal-500 border border-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition-colors duration-300"
                >
                  Iniciar sesión
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-gray-600" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex z-30 rounded-lg items-center justify-center space-x-4 lg:space-x-8 shadow-md top-14 border-t border-gray-100 absolute left-1/2 transform -translate-x-1/2 h-12 bg-white px-2">
            {NameLinkes.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item.link)}
                className="relative cursor-pointer overflow-hidden px-3 lg:px-4 py-2 group"
              >
                <span className="relative z-10 text-gray-600 group-hover:text-white transition-colors duration-300">
                  {item.name}
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 transform scale-0 rounded-lg transition-transform duration-300 ease-out origin-center group-hover:scale-100"></span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden absolute w-full bg-white border-t border-gray-100 shadow-md transition-all duration-300 ${
              isMenuOpen ? "max-h-96" : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="flex flex-col space-y-2 p-4">
              {NameLinkes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.link)}
                  className="w-full text-left px-4 py-2 text-gray-600 hover:bg-teal-50 rounded-lg transition-colors duration-300"
                >
                  {item.name}
                </button>
              ))}
              <Link
                to="/login"
                className="w-full text-center mt-4 px-6 py-2 text-teal-500 border border-teal-500 rounded-full hover:bg-teal-500 hover:text-white transition-colors duration-300"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[calc(100%-5rem)] w-full bg-black">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;