import { useState } from "react";
import { Baby, X, ChevronLeft, ChevronRight, Clock, Award } from "lucide-react";
import { informacionPesquisas } from "./data/informativo";

const InfoCard = ({ info, onOpen, isVisible }: any) => {
  const Icon = info.icono;

  return (
    <div
      onClick={() => onOpen(info)}
      className={`bg-white p-10 rounded-3xl shadow-xl border-2 border-indigo-50 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="flex flex-col items-center text-center space-y-6 mb-8">
        <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-2xl">
          <Icon className="w-12 h-12 text-primary-500" />
        </div>
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-gray-800">{info.titulo}</h3>
          <span className="inline-block text-sm font-medium text-primary-500 bg-indigo-50 px-4 py-2 rounded-full">
            {info.categoria}
          </span>
        </div>
      </div>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        {info.descripcionCorta}
      </p>
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl">
        <p className="text-sm font-medium text-primary-500">
          ¿Sabías que? {info.estadistica}
        </p>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 opacity-100">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-indigo-50 transition-colors duration-200"
        >
          <X className="w-6 h-6 text-primary-500" />
        </button>
        {children}
      </div>
    </div>
  );
};

const InfoModal = ({ info, isOpen, onClose }: any) => {
  if (!info) return null;
  const Icon = info.icono;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-10">
        <div className="flex items-center space-x-6 mb-10">
          <div className="p-4 bg-gradient-to-br from-white to-purple-100 rounded-2xl">
            <Icon className="w-10 h-10 text-primary-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {info.titulo}
            </h2>
            <span className="text-sm font-medium text-primary-500 bg-indigo-50 px-4 py-2 rounded-full">
              {info.categoria}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl mb-8">
          <p className="text-lg font-medium text-primary-500">
            Dato destacado: {info.estadistica}
          </p>
        </div>

        <div className="space-y-10">
          {Object.entries(info.contenidoCompleto).map(([key, value]) => (
            <div
              key={key}
              className="transform transition-all duration-300 hover:translate-x-2"
            >
              <h4 className="font-bold text-xl text-gray-800 mb-4 capitalize flex items-center">
                <div className="w-2 h-8 bg-primary-500 rounded-full mr-4" />
                {key.replace(/([A-Z])/g, " $1").trim()}
              </h4>
              {Array.isArray(value) ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {value.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start space-x-3 text-gray-600 text-lg"
                    >
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                      <span>{String(item)}</span>
                    </li>
                  ))}
                </ul>
              ) : typeof value === "object" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {value &&
                    Object.entries(value).map(([subKey, subValue]) => (
                      <div
                        key={subKey}
                        className="bg-white p-4 rounded-xl shadow-sm"
                      >
                        <h5 className="font-semibold text-primary-500 mb-2">
                          {subKey}
                        </h5>
                        <p className="text-gray-600">{String(subValue)}</p>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {String(value)}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            ¿Te resultó útil esta información?
          </h4>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-500 transition-colors">
              Sí, muy útil
            </button>
            <button className="px-6 py-2 border border-primary-500 text-primary-500 rounded-full hover:bg-indigo-50 transition-colors">
              Necesito más información
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const InfoCarousel = () => {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const cardsPerPage = window.innerWidth >= 1280 ? 3 : 2;

  const nextSlide = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev + cardsPerPage >= informacionPesquisas.length
          ? 0
          : prev + cardsPerPage
      );
      setIsVisible(true);
    }, 300);
  };

  const prevSlide = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentIndex((prev) =>
        prev - cardsPerPage < 0
          ? informacionPesquisas.length - cardsPerPage
          : prev - cardsPerPage
      );
      setIsVisible(true);
    }, 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Guía Completa de Cuidados Neonatales
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Descubre toda la información esencial sobre el cuidado y desarrollo de
          tu bebé, desde el tamizaje neonatal hasta los hitos más importantes
          del primer año
        </p>
        <div className="mt-8 flex justify-center space-x-4">
          <div className="flex items-center space-x-2 text-primary-500">
            <Award className="w-5 h-5" />
            <span className="font-medium">Información Certificada</span>
          </div>
          <div className="flex items-center space-x-2 text-primary-500">
            <Clock className="w-5 h-5" />
            <span className="font-medium">Actualización Regular</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {informacionPesquisas
            .slice(currentIndex, currentIndex + cardsPerPage)
            .map((info) => (
              <InfoCard
                key={info.id}
                info={info}
                onOpen={setSelectedInfo}
                isVisible={isVisible}
              />
            ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-4 bg-white rounded-full shadow-lg hover:bg-indigo-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 group"
        >
          <ChevronLeft className="w-6 h-6 text-primary-500 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-4 bg-white rounded-full shadow-lg hover:bg-indigo-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 group"
        >
          <ChevronRight className="w-6 h-6 text-primary-500 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex rounded-full bg-indigo-50 p-4">
          <div className="flex items-center space-x-2 text-primary-500">
            <Baby className="w-5 h-5" />
            <span className="font-medium">
              {informacionPesquisas.length} temas importantes para explorar
            </span>
          </div>
        </div>
      </div>

      <InfoModal
        info={selectedInfo}
        isOpen={!!selectedInfo}
        onClose={() => setSelectedInfo(null)}
      />
    </div>
  );
};

export default InfoCarousel;
