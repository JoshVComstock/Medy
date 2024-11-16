import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import imagen1 from '@/assets/images/imagen1.jpg'
import imagen2 from '@/assets/images/imagen2.jpg'
import imagen3 from '@/assets/images/imagen3.jpg'

interface Image {
  url: string;
  alt: string;
  title: string;
  description: string;
}

const images: Image[] = [
  {
    url: imagen1,
    alt: "Laboratorio de pesquisas neonatales",
    title: "Detección Temprana",
    description: "Identificamos condiciones de salud desde el primer día"
  },
  {
    url: imagen2,
    alt: "Bebé en revisión médica",
    title: "Cuidado Experto",
    description: "Profesionales especializados en salud neonatal"
  },
  {
    url: imagen3,
    alt: "Tecnología médica avanzada",
    title: "Tecnología Avanzada",
    description: "Equipamiento de última generación para resultados precisos"
  }
];

const HeroSection: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextImage();
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextImage = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevImage = (): void => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section className="relative h-screen  w-full overflow-hidden bg-black">
      <AnimatePresence mode='wait'>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <img
              src={images[currentImage].url}
              alt={images[currentImage].alt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute  bottom-8 left-8 flex gap-4 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevImage}
          className="p-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm
                   hover:bg-white/10 transition-colors duration-300"
          aria-label="Imagen anterior"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextImage}
          className="p-2 rounded-full border border-white/20 bg-black/20 backdrop-blur-sm
                   hover:bg-white/10 transition-colors duration-300"
          aria-label="Siguiente imagen"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>
      </div>

      <div className="relative  h-full flex items-center z-20">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.5,
                  opacity: { duration: 0.3 },
                  y: { duration: 0.3 }
                }}
                className="space-y-4"
              >
                <motion.span 
                  className="text-primary-500 font-medium block"
                >
                  Laboratorio especializado
                </motion.span>
                <motion.h1 
                  className="text-6xl font-bold text-white tracking-tight"
                >
                  {images[currentImage].title}
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-300"
                >
                  {images[currentImage].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            <motion.a
              href="#queson"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-lg
                       hover:bg-primary-600 transition-colors duration-300 mt-8 "
            >
              Explorar servicios
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex items-center gap-2 z-10">
        {images.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => !isAnimating && setCurrentImage(index)}
            className={`h-2 rounded-full transition-all duration-500
                      ${currentImage === index 
                        ? 'bg-primary-500 w-8' 
                        : 'bg-white/50 w-2 hover:bg-white/70'}`}
            aria-label={`Ir a imagen ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;