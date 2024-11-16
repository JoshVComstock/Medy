const Footer = () => {
    const scrollToSection = (link: string) => {
        const id = link.replace("#", ""); 
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: "smooth",
          });
        }
      };

  const NameLinkes = [
    {
      name: "Inicio",
      link: "#inicio",
    },
    {
      name: "Que son",
      link: "#queson",
    },
    {
      name: "Informacion",
      link: "#que-son",
    },
    {
      name: "Centros",
      link: "#centros",
    },
    {
      name: "Contactos",
      link: "#contacto",
    },
  ];
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nosotros</h3>
            <p className="text-gray-400">
              Dedicados a difundir conocimiento sobre metodologías de
              investigación.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              {NameLinkes.map((v, i) => (
                <li key={i}>
                  <a 
                  onClick={() => (scrollToSection(v.link))}
                  className="hover:text-white cursor-pointer">
                    {v.name}
                  </a>
                </li>
              ))}
             
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Guías
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <p className="text-gray-400">info@pesquisas.com</p>
            <p className="text-gray-400">Tel: (+591) 68540240</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Pesquisas Info. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
